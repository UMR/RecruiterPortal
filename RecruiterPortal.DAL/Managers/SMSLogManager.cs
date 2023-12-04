﻿using Microsoft.Extensions.Configuration;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using RingCentral;

namespace RecruiterPortalDAL.Managers
{
    public class SMSLogManager
    {
        private readonly IConfiguration _configuration;
        public static string RINGCENTRAL_CLIENTID;
        public static string RINGCENTRAL_CLIENTSECRET;
        public static string RINGCENTRAL_USERNAME;
        public static string RINGCENTRAL_PASSWORD;
        public static string RINGCENTRAL_FROM_NUMBER;
        public static string RINGCENTRAL_EXTENSION;
        public static string RINGCENTRAL_PRODUCTION;

        public SMSLogManager(IConfiguration configuration)
        {
            _configuration = configuration;
            RINGCENTRAL_CLIENTID = _configuration["Google:RingcentralClientId"];
            RINGCENTRAL_CLIENTSECRET = _configuration["Google:RingcentralClientSecret"];
            RINGCENTRAL_USERNAME = _configuration["Google:RingcentralUsername"];
            RINGCENTRAL_PASSWORD = _configuration["Google:RingcentralPassword"];
            RINGCENTRAL_FROM_NUMBER = _configuration["Google:RingcentralFromNumber"];
            RINGCENTRAL_EXTENSION = _configuration["Google:RingcentralExtension"];
            RINGCENTRAL_PRODUCTION = _configuration["Google:RingcentralProduction"];
        }
        public static async Task<int> Insert(SMSLogModel request, int recruiterId)
        {
            try
            {
                GenericRepository<Smslog> repository = new GenericRepository<Smslog>();
                Smslog sms = MapObjectRequest(request, recruiterId);
                Smslog createdJob = await repository.SaveAsync(sms);
                return createdJob.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        private static Smslog MapObjectRequest(SMSLogModel request, int recruiterId)
        {
            Smslog smslog = new Smslog();
            smslog.Id = request.Id;
            smslog.ToNumber = request.ToNumber;
            smslog.FromNumber = request.FromNumber;
            smslog.Smsbody = request.Smsbody;
            smslog.SendTime = request.SendTime;
            smslog.CreatedDate = DateTime.Now;
            smslog.CreatedBy = recruiterId;

            return smslog;
        }

        public static async Task<MessageBatchInfo> SendBulkSMS(string body, string[] numbers)
        {
            MessageBatchInfo messageBatchInfo = null;

            try
            {
                var restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_PRODUCTION);
                await restClient.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);

                var parameters = new CreateSMSMessageBatchRequest();
                parameters.from = RINGCENTRAL_FROM_NUMBER;
                parameters.text = body;

                parameters.messages = new MessageCreateRequest[numbers.Length];
                for (var i = 0; i < numbers.Length; i++)
                {
                    var recipient = new MessageCreateRequest();
                    recipient.to = new string[] { numbers[i] };
                    recipient.text = body;
                    parameters.messages[i] = recipient;
                }

                messageBatchInfo = await restClient.Restapi().Account().A2pSms().Batches().Post(parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return messageBatchInfo;
        }

        public static async Task<int> SendSMS(string messageBody, string[] numbers, int recuiterId)
        {
            try
            {

                List<string> sendNumbers = new List<string>();
                string message = messageBody.Trim().ToString();


                if (numbers.Length > 0)
                {
                    string selectedNumbers = string.Empty;
                    foreach (var entry in numbers)
                    {
                        string receiverNumber = entry;
                        string firstChar = receiverNumber.Substring(0, 1);
                        string secondChar = receiverNumber.Substring(1, 1);

                        if (receiverNumber.Length == 10)
                        {
                            receiverNumber = "+1" + receiverNumber;
                        }
                        else if (receiverNumber.Length == 11 && firstChar != "+" && firstChar == "1")
                        {
                            receiverNumber = "+" + receiverNumber;
                        }
                        else if (receiverNumber.Length == 11 && firstChar == "+" && firstChar != "1")
                        {
                            receiverNumber = "+" + "1" + receiverNumber.Substring(1, receiverNumber.Length - 1);
                        }
                        if (string.IsNullOrEmpty(selectedNumbers))
                        {
                            selectedNumbers = receiverNumber;
                        }
                        else
                        {
                            selectedNumbers = selectedNumbers + "," + receiverNumber;
                        }
                        sendNumbers.Add(receiverNumber);
                    }

                    var result = await SendBulkSMS(message, sendNumbers.ToArray());

                    if (result.status == "Processing")
                    {
                        string msg = string.Empty;
                        SMSLogModel smsLogModel = new SMSLogModel();
                        smsLogModel.FromNumber = "19147377499";
                        smsLogModel.ToNumber = selectedNumbers;
                        smsLogModel.Smsbody = message;
                        return await Insert(smsLogModel, recuiterId);
                        //var success = AddSMS("19147377499", selectedNumbers, message, this.UserId, out msg);
                    }
                    else
                    {
                        return await Task.FromResult<int>(0);
                        //throw new Exception("SMS Send Faild");
                        //ScriptManager.RegisterStartupScript(Page, typeof(Page), "Failed", "SMS Send Faild", true);
                    }
                }
                else
                {
                    return await Task.FromResult<int>(0);
                    //throw new Exception("");
                    //not valid number
                }
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("CMN-101"))
                {
                    throw new Exception("");
                    //ScriptManager.RegisterStartupScript(Page, typeof(Page), "Invalid", "Invalid()", true);
                }
                else {
                    return await Task.FromResult<int>(0);
                }
            }
        }


    }
}

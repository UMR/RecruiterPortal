using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortalDAL.Managers
{
    public interface IMailConfigurationManager
    {
        Task<int> Create(MailConfigurationRequest request, int recruiterId);
        ViewMailConfiguration GetEailConfigByAdress(string p_POP3UserName);
        Task<bool?> Update(MailConfigurationRequest request, int recruiterId);
    }

    public class MailConfigurationManager : IMailConfigurationManager
    {
        public const string POP3USERNAME = "trahman@ael-bd.com";

        public ViewMailConfiguration GetEailConfigByAdress(string p_POP3UserName)
        {
            string spName = "sp_GetMailConfigByPOP3UserName";
            SqlParameter[] sqlParameters = new GenericRepository<ViewMailConfiguration>().GetSqlParametersFromStoredProcedure(spName);

            foreach (SqlParameter sqlParameter in sqlParameters)
            {
                if ("@" + nameof(p_POP3UserName) == sqlParameter.ParameterName)
                {
                    sqlParameter.Value = p_POP3UserName;
                }
            }
            ViewMailConfiguration mailVerfication = null;
            try
            {

                mailVerfication = new GenericRepository<ViewMailConfiguration>().GetOne(spName, sqlParameters);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return mailVerfication;
        }

        private RecruiterMailConfig MapMailConfigCreateRequest(MailConfigurationRequest request, int recruiterId)
        {
            RecruiterMailConfig mailConfig = new RecruiterMailConfig();
            mailConfig.RecruiterId = recruiterId;
            mailConfig.ProfileName = request.ProfileName;
            mailConfig.Email = request.EmailAddress;
            mailConfig.GoogleRefreshToken = request.GoogleRefreshToken;
            mailConfig.CreatedBy = recruiterId;
            mailConfig.CreatedDate = DateTime.Now;
            return mailConfig;
        }

        private RecruiterMailConfig MapMailConfigUpdateRequest(MailConfigurationRequest request, RecruiterMailConfig mailConfig, int recruiterId)
        {
            mailConfig.Id = request.Id;
            mailConfig.RecruiterId = recruiterId;
            mailConfig.ProfileName = request.ProfileName;
            mailConfig.Email = request.EmailAddress;
            mailConfig.GoogleRefreshToken = request.GoogleRefreshToken;
            mailConfig.UpdatedBy = recruiterId;
            mailConfig.UpdatedDate = DateTime.Now;
            return mailConfig;
        }

        public async Task<int> Create(MailConfigurationRequest request, int recruiterId)
        {
            try
            {
                GenericRepository<RecruiterMailConfig> repository = new GenericRepository<RecruiterMailConfig>();
                RecruiterMailConfig mailConfigToCreate = MapMailConfigCreateRequest(request, recruiterId);
                RecruiterMailConfig createdMailConfig = await repository.SaveAsync(mailConfigToCreate);
                return createdMailConfig.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool?> Update(MailConfigurationRequest request, int recruiterId)
        {
            try
            {
                GenericRepository<RecruiterMailConfig> repository = new GenericRepository<RecruiterMailConfig>();
                RecruiterMailConfig mailConfig = await repository.GetByIdAsync(m => m.Id == request.Id);
                if (mailConfig != null)
                {
                    var mailConfigToUpdate = MapMailConfigUpdateRequest(request, mailConfig, recruiterId);
                    return await repository.UpdateAsync(mailConfigToUpdate) > 0 ? true : false;
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

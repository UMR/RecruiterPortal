using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortalDAL.Managers
{
    public class SMSLogManager
    {
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
    }
}

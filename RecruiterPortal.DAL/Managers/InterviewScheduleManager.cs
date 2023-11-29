using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;

namespace RecruiterPortalDAL.Managers
{
    public class InterviewScheduleManager
    {
        public static async Task<List<InterviewSchedule>> GetInterviewScheduleByRecruiterId(int recruiterId)
        {
            try
            {
                List<InterviewSchedule> interviewScheduleResponseList = new List<InterviewSchedule>();
                GenericRepository<InterviewSchedule> repository = new GenericRepository<InterviewSchedule>();
                var interviewSchedules = await repository.GetAllAsync(m => m.RecruiterId == recruiterId);
                if (interviewSchedules != null && interviewSchedules.Count() > 0)
                {
                    interviewScheduleResponseList = interviewSchedules.ToList();
                }

                return interviewScheduleResponseList;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Models;
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

        public static async Task<long> InsertSchedule(InterviewScheduleModel request, int recruiterId)
        {
            try
            {
                GenericRepository<InterviewSchedule> repository = new GenericRepository<InterviewSchedule>();

                InterviewSchedule interviewSchedule = MapInterviewScheduleRequest(request, recruiterId);
                InterviewSchedule createdUpdateSchedule = await repository.SaveAsync(interviewSchedule);
                return createdUpdateSchedule.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<long> UpdateSchedule(InterviewScheduleModel request, int recruiterId)
        {
            try
            {
                GenericRepository<InterviewSchedule> repository = new GenericRepository<InterviewSchedule>();
                InterviewSchedule interviewSchedule = MapInterviewScheduleRequest(request, recruiterId);
                return await repository.UpdateAsync(interviewSchedule);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private static InterviewSchedule MapInterviewScheduleRequest(InterviewScheduleModel request, int recruiterId)
        {
            InterviewSchedule interviewSchedule = new InterviewSchedule();
            interviewSchedule.Id = request.Id;
            interviewSchedule.Title = request.Title;
            interviewSchedule.StartDate = request.StartDate;
            interviewSchedule.EndDate = request.EndDate;
            interviewSchedule.Description = request.Description;
            interviewSchedule.RecruiterId = recruiterId;
            if (request.Id == 0)
            {
                interviewSchedule.CreatedBy = recruiterId;
                interviewSchedule.CreatedDate = DateTime.Now;
            }
            else
            {
                interviewSchedule.UpdatedBy = recruiterId;
                interviewSchedule.UpdatedDate = DateTime.Now;
            }
            return interviewSchedule;
        }

        public static async Task<int?> Delete(int id)
        {
            try
            {
                int? result = null;
                GenericRepository<InterviewSchedule> repository = new GenericRepository<InterviewSchedule>();
                InterviewSchedule schedule = await repository.GetByIdAsync(j => j.Id == id);

                if (schedule != null)
                {
                    result = await repository.DeleteAsync(schedule);
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

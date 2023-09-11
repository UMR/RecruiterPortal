using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortal.DAL.Managers
{
    public class JobManager
    {
        public static async Task<Job> Insert(Job job)
        {
            try
            {
                GenericRepository<Job> repository = new GenericRepository<Job>();
                return await repository.SaveAsync(job);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<int> Update(Job job)
        {
            try
            {
                GenericRepository<Job> repository = new GenericRepository<Job>();
                return await repository.UpdateAsync(job);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<int> Delete(Job job)
        {
            try
            {
                GenericRepository<Job> repository = new GenericRepository<Job>();
                return await repository.DeleteAsync(job);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<IEnumerable<Job>> GetJobByAgencyId(long agencyId, int page, int pageSize)
        {
            try
            {
                GenericRepository<Job> repository = new GenericRepository<Job>();
                return await repository.GetPageAsync(p => p.AgencyId == agencyId, page, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static async Task<Job> GetJobById(int jobId)
        {
            try
            {
                GenericRepository<Job> repository = new GenericRepository<Job>();
                return await repository.GetByIdAsync(p => p.JobId == jobId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static JobResponseModel GetJobByIdWithRelated(int jobId)
        {
            JobResponseModel jobResponse = null;
            using (UmrrecruitmentApplicantContext context = new UmrrecruitmentApplicantContext())
            {
                jobResponse = (from job in context.Jobs
                               join pos in context.Positions
                               on job.JobId equals pos.Id
                               join ins in context.Institutions
                               on job.JobId equals ins.Id
                               where job.JobId == jobId
                               select (new JobResponseModel
                               {
                                   JobId = job.JobId,
                                   Status = job.Status,
                                   JobTitle = job.JobTitle,
                                   JobDescription = job.JobDescription,
                                   PositionId = job.PositionId,
                                   Position = pos.PositionName,
                                   InstituteId = ins.Id,
                                   Institute = ins.InstituteName,
                                   AgencyId = job.AgencyId,
                                   CreatedBy = job.CreatedBy,
                                   CreatedDate = job.CreatedDate,
                                   UpdatedBy = job.UpdatedBy,
                                   UpdatedDate = job.UpdatedDate
                               })
                       ).FirstOrDefault();
            }

            return jobResponse;
        }
    }
}

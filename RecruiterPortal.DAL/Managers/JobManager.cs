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
    }
}

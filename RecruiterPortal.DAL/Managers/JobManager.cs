using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Dynamic;

namespace RecruiterPortal.DAL.Managers
{
    public class JobManager
    {
        public static int Insert(Job job)
        {
            string spName = "sp_InsertJob";
            try
            {
                GenericRepository<Job> jobRepo = new GenericRepository<Job>();
                SqlParameter[] sqlParameters = jobRepo.GetSqlParametersFromObject(job, spName, "@");
                jobRepo.Insert(spName, sqlParameters);
                return 1;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static int Update(Job job)
        {
            string spName = "sp_UpdateJob";
            try
            {
                GenericRepository<Job> jobRepo = new GenericRepository<Job>();
                SqlParameter[] sqlParameters = jobRepo.GetSqlParametersFromObject(job, spName, "@");
                return jobRepo.Update(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static IEnumerable<Job> GetJobByAgencyId(long agencyId)
        {
            string spName = "sp_GetJobByAgencyId";
            try
            {
                GenericRepository<Job> jobRepo = new GenericRepository<Job>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.AgencyId = agencyId;
                SqlParameter[] sqlParameters = jobRepo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@");
                return jobRepo.GetAll(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static Job GetJobById(int jobId)
        {
            string spName = "sp_GetJobById";
            try
            {
                GenericRepository<Job> jobRepo = new GenericRepository<Job>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.JobId = jobId;
                SqlParameter[] sqlParameters = jobRepo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@");
                return jobRepo.GetOne(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

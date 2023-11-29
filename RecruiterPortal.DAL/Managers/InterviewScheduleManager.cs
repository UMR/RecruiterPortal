using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;

namespace RecruiterPortalDAL.Managers
{
    public class InterviewScheduleManager
    {
        public static Agency GetInterviewScheduleById(string p_Url)
        {
            string spName = "SP_GET_AgencyByUrl";
            SqlParameter[] sqlParameters = new GenericRepository<Agency>().GetSqlParametersFromStoredProcedure(spName);

            foreach (SqlParameter sqlParameter in sqlParameters)
            {
                if ("@" + nameof(p_Url) == sqlParameter.ParameterName)
                {
                    sqlParameter.Value = p_Url;
                }
            }

            Agency agency;

            try
            {
                agency = new GenericRepository<Agency>().GetOne(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return agency;
        }

        public static List<Agency> GetAllActiveAgency()
        {
            string spName = "SP_Get_All_Active_Agency";
            List<Agency> agencies;

            try
            {
                agencies = new GenericRepository<Agency>().GetAll(spName, null).ToList(); ;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return agencies;
        }

        public static DataTable GetAgencies()
        {
            string spName = "SP_All_GET_Agency";
            GenericRepository<Agency> agencyRepo = new GenericRepository<Agency>();
            SqlParameter[] sqlParameters = agencyRepo.GetSqlParametersFromStoredProcedure(spName);
            DataTable agencyDt = null;
            try
            {
                agencyDt = agencyRepo.LoadDataTable(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return agencyDt;
        }
        public static void SaveAgency(Agency agency)
        {
            string spName = "sp_InsertAgency";

            try
            {
                GenericRepository<Agency> agencyRepo = new GenericRepository<Agency>();
                SqlParameter[] sqlParameters = agencyRepo.GetSqlParametersFromObject(agency, spName);
                agencyRepo.Insert(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static void UpdateAgency(Agency agency)
        {
            string spName = "sp_UpdateAgency";

            try
            {
                GenericRepository<Agency> agencyRepo = new GenericRepository<Agency>();
                SqlParameter[] sqlParameters = agencyRepo.GetSqlParametersFromObject(agency, spName);
                agencyRepo.Update(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static async Task<int?> Delete(int id)
        {
            try
            {
                int? result = null;
                GenericRepository<Agency> repository = new GenericRepository<Agency>();
                Agency agency = await repository.GetByIdAsync(j => j.AgencyId == id);

                if (agency != null)
                {
                    result = await repository.DeleteAsync(agency);
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

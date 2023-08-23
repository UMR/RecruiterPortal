using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortal.DAL.Utility;
using System.Data;
using System.Dynamic;

namespace RecruiterPortal.DAL.Managers
{
    public class RecruiterManager
    {
        public static bool ValidateRecruiter(string loginId, string password, long agencyId, bool useEncryption = true)
        {
            bool isValidRecruiter = false;
            string spName = "sp_ValidateRecruiter";
            dynamic recruiter = new ExpandoObject();
            recruiter.LoginId = loginId;
            recruiter.AgencyId = agencyId;

            if (!useEncryption)
            {
                recruiter.Password = password.Trim();
            }
            else
            {
                recruiter.Password = SHA256Hasher.GetSHA256Hash(AESEncryptor.EncryptStringToBytes_Aes(password.Trim()));
            }

            GenericRepository<Recruiter> recruiterRepo = new GenericRepository<Recruiter>();
            SqlParameter[] sqlParameters = recruiterRepo.GetSqlParametersFromExpandoObject(recruiter, spName, "@");

            try
            {
                if (recruiterRepo.DoesExist(spName, sqlParameters))
                {
                    isValidRecruiter = true;
                }
                else
                {
                    isValidRecruiter = false;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return isValidRecruiter;
        }

        public static Recruiter GetRecruiterByLoginid(string loginId)
        {
            string spName = "sp_GetRecruiterByLoginid";

            try
            {
                GenericRepository<Recruiter> recruiterRepo = new GenericRepository<Recruiter>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.LoginId = loginId;
                SqlParameter[] sqlParameters = recruiterRepo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@");

                return recruiterRepo.GetOne(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static DataTable GetAllRecruiter()
        {
            string spName = "SP_All_GET_Recruiter";
            GenericRepository<Recruiter> agencyRepo = new GenericRepository<Recruiter>();
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
    }
}

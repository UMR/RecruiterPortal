using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortal.DAL.Utility;
using System.Dynamic;

namespace RecruiterPortal.DAL.Managers
{
    public class RecruiterManager
    {
        public static bool ValidateRecruiter(string email, string password, bool useEncryption = true)
        {
            bool isValidRecruiter = false;
            string spName = "sp_ValidateRecruiter";
            dynamic ValiddateLogin = new ExpandoObject();
            ValiddateLogin.Email = email;

            if (!useEncryption)
            {
                ValiddateLogin.Password = password.Trim();
            }
            else
            {
                ValiddateLogin.Password = SHA256Hasher.GetSHA256Hash(AESEncryptor.EncryptStringToBytes_Aes(password.Trim()));
            }

            GenericRepository<Recruiter> userRepo = new GenericRepository<Recruiter>();
            SqlParameter[] sqlParameters = userRepo.GetSqlParametersFromExpandoObject(ValiddateLogin, spName, "@");

            try
            {
                if (userRepo.DoesExist(spName, sqlParameters))
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
    }
}

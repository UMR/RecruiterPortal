using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;

namespace RecruiterPortal.DAL.Managers
{
    public class MailManager
    {
        public static DataTable GetAllEmailByFilter(string email, string firstName, string lastName, bool? isVerified, int currentRecruiterId)
        {
            string spName = "sp_GetAllEmailByFilter";
            dynamic expandoObject = new ExpandoObject();            
            expandoObject.FirstName = firstName;
            expandoObject.LastName = lastName;
            expandoObject.Email = email;
            expandoObject.CurrentRecruiterId = currentRecruiterId;
            expandoObject.IsVerified = isVerified;            

            GenericRepository<User> userRepo = new GenericRepository<User>();
            SqlParameter[] sqlParameters = userRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
            DataTable dtUser = null;

            try
            {
                dtUser = userRepo.LoadDataTable(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return dtUser;
        }
    }
}

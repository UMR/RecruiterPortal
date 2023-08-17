using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers
{
    public class EmploymentManager
    {
        public static void InsertEmployment(UserCompany empInfo)
        {
            string spName = "sp_InsertUserCompany";

            try
            {
                GenericRepository<UserCompany> employInfo = new GenericRepository<UserCompany>();
                SqlParameter[] sqlParameters = employInfo.GetSqlParametersFromObject(empInfo, spName);
                employInfo.Insert(spName, sqlParameters);                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static int UpdateEmployment(UserCompany emergencyInfo)
        {
            string spName = "sp_UpdateUserCompany";

            try
            {
                GenericRepository<UserCompany> employInfo = new GenericRepository<UserCompany>();
                SqlParameter[] sqlParameters = employInfo.GetSqlParametersFromObject(emergencyInfo, spName);
                var result = employInfo.Update(spName, sqlParameters);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static int DeleteEmploment(long userCompanyId)
        {
            string spName = "sp_DeleteUserCompanyByCompanyID";

            try
            {
                GenericRepository<UserCompany> employInfo = new GenericRepository<UserCompany>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.UserCompanyID = userCompanyId;
                SqlParameter[] sqlParameters = employInfo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@");
                var result = employInfo.Delete(spName, sqlParameters);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static IEnumerable<UserCompany> GetEmploymentsByUserId(long userId)
        {
            string spName = "sp_GetUserCompanyByUserID";

            try
            {
                GenericRepository<UserCompany> employInfo = new GenericRepository<UserCompany>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.UserID = userId;
                SqlParameter[] sqlParameters = employInfo.GetSqlParametersFromExpandoObject(expandoObject,spName,"@");                
                return employInfo.GetAll(spName, sqlParameters);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }        
        public static UserCompany GetEmploymentById(long userCompanyId)
        {
            string spName = "sp_GetUserCompanyByUserCompanyID";

            try
            {
                GenericRepository<UserCompany> employInfo = new GenericRepository<UserCompany>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.UserCompanyID = userCompanyId;
                SqlParameter[] sqlParameters = employInfo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@");
                return employInfo.GetOne(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }        

        public static DataTable GetEmployDataTable(long UserID)
        {
            string spName = "sp_GetUserCompanyByUserID";

            GenericRepository<UserCompany> userCompanyRepo = new GenericRepository<UserCompany>();
            dynamic expandoObject = new ExpandoObject();
            expandoObject.UserID = UserID;
            SqlParameter[] sqlParameters = userCompanyRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
            DataTable userCompanyDataTable = null;
            try
            {
                userCompanyDataTable = userCompanyRepo.LoadDataTable(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return userCompanyDataTable;
        }
    }
}

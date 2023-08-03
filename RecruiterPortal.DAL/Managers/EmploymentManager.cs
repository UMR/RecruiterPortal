using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers
{
    public class EmploymentManager
    {
        public static void InsertEmploy(UserCompany empInfo)
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
        public static void UpdateEmploy(UserCompany emergencyInfo)
        {
            string spName = "sp_UpdateUserCompany";

            try
            {
                GenericRepository<UserCompany> employInfo = new GenericRepository<UserCompany>();
                SqlParameter[] sqlParameters = employInfo.GetSqlParametersFromObject(emergencyInfo, spName);
                employInfo.Update(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static IEnumerable<UserCompany> GetEmploy(long UserID)
        {
            string spName = "sp_GetUserCompanyByUserID";

            try
            {
                SqlParameter[] sqlParameters = new GenericRepository<UserCompany>().GetSqlParametersFromStoredProcedure(spName);

                foreach (SqlParameter sqlParameter in sqlParameters)
                {

                    if ("@" + nameof(UserID) == sqlParameter.ParameterName)
                    {
                        sqlParameter.Value = UserID;
                    }
                    else
                    {
                        sqlParameter.Value = DBNull.Value;
                    }
                }
                return new GenericRepository<UserCompany>().GetAll(spName, sqlParameters);

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
        public static IEnumerable<UserCompany> GetEmployByEmpId(long UserCompanyID)
        {
            string spName = "sp_GetUserCompanyByUserCompanyID";

            try
            {
                SqlParameter[] sqlParameters = new GenericRepository<UserCompany>().GetSqlParametersFromStoredProcedure(spName);

                foreach (SqlParameter sqlParameter in sqlParameters)
                {

                    if ("@" + nameof(UserCompanyID) == sqlParameter.ParameterName)
                    {
                        sqlParameter.Value = UserCompanyID;
                    }
                    else
                    {
                        sqlParameter.Value = DBNull.Value;
                    }
                }
                return new GenericRepository<UserCompany>().GetAll(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static int DeleteEmploment(long UserCompanyID)
        {
            string spName = "sp_DeleteUserCompanyByCompanyID";

            try
            {
                SqlParameter[] sqlParameters = new GenericRepository<UserEmergencyInfo>().GetSqlParametersFromStoredProcedure(spName);

                foreach (SqlParameter sqlParameter in sqlParameters)
                {

                    if ("@" + nameof(UserCompanyID) == sqlParameter.ParameterName)
                    {
                        sqlParameter.Value = UserCompanyID;
                    }
                    else
                    {
                        sqlParameter.Value = DBNull.Value;
                    }
                }
                var result = new GenericRepository<UserCompany>().Delete(spName, sqlParameters);
                return result;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

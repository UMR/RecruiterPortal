using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers
{
    public class UserMilitaryManager
    {
        public static int SaveUserMilitary(UserMilitary userMilitary)
        {
            string spName = "sp_InsertUserMilitary";

            try
            {
                try
                {
                    GenericRepository<UserMilitary> userMilitartRepo = new GenericRepository<UserMilitary>();
                    SqlParameter[] sqlParameters = userMilitartRepo.GetSqlParametersFromObject(userMilitary, spName, "@p_");
                    userMilitartRepo.Insert(spName, sqlParameters);
                    return 1;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static int UpdateUserMilitary(UserMilitary userMilitary)
        {
            string spName = "sp_UpdateUserMilitary";

            try
            {
                GenericRepository<UserMilitary> userMilitartRepo = new GenericRepository<UserMilitary>();
                SqlParameter[] sqlParameters = userMilitartRepo.GetSqlParametersFromObject(userMilitary,spName, "@p_");
                return userMilitartRepo.Update(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static UserMilitary GetByUserID(Int64 p_UserID)
        {
            string spName = "sp_GetUserMilitary";


            SqlParameter[] sqlParameters = new GenericRepository<UserMilitary>().GetSqlParametersFromStoredProcedure(spName);

            foreach (SqlParameter sqlParameter in sqlParameters)
            {
                if ("@" + nameof(p_UserID) == sqlParameter.ParameterName)
                {
                    sqlParameter.Value = p_UserID;
                }
            }

            UserMilitary userMilitary;

            try
            {
                userMilitary = new GenericRepository<UserMilitary>().GetOne(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return userMilitary;
        }
        public static DataTable GetUserMilitaryByUserID(Int64 p_UserID)
        {
            string spName = "sp_GetUserMilitary";

            dynamic expandoObject = new ExpandoObject();
            expandoObject.p_UserID = p_UserID;
            GenericRepository<UserMilitary> militaryRepo = new GenericRepository<UserMilitary>();
            SqlParameter[] sqlParameters = militaryRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
            DataTable militaryDataTable = null;
            try
            {
                militaryDataTable = militaryRepo.LoadDataTable(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return militaryDataTable;
        }
    }
}

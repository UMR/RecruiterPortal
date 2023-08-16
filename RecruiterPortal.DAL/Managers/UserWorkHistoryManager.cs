using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Dynamic;

namespace RecruiterPortal.DAL.Managers
{
    public class UserWorkHistoryManager
    {
        public static void InsertWorkHistory(UserWorkHistory userWorkHistory)
        {
            string spName = "sp_InsertUserWorkHistory";

            try
            {
                GenericRepository<UserWorkHistory> userWorkHistoryRepo = new GenericRepository<UserWorkHistory>();
                SqlParameter[] sqlParameters = userWorkHistoryRepo.GetSqlParametersFromObject(userWorkHistory, spName);
                userWorkHistoryRepo.Insert(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static void UpdateWorkHistory(UserWorkHistory userWorkHistory)
        {
            string spName = "sp_UpdateUserWorkHistory";

            try
            {
                GenericRepository<UserWorkHistory> userWorkHistoryRepo = new GenericRepository<UserWorkHistory>();
                SqlParameter[] sqlParameters = userWorkHistoryRepo.GetSqlParametersFromObject(userWorkHistory, spName);
                userWorkHistoryRepo.Update(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static UserWorkHistory GetWorkHistoryById(int id)
        {
            string spName = "sp_GeteUserWorkHistoryById";

            try
            {
                GenericRepository<UserWorkHistory> userWorkHistoryRepo = new GenericRepository<UserWorkHistory>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.Id = id;
                SqlParameter[] sqlParameters = userWorkHistoryRepo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@");
                UserWorkHistory workHistory =  userWorkHistoryRepo.GetOne(spName, sqlParameters);

                return workHistory;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static int DeleteWorkHistory(int id)
        {
            string spName = "sp_DeleteUserWorkHistoryById";

            try
            {
                GenericRepository<Institution> userWorkHistoryRepo = new GenericRepository<Institution>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.Id = id;
                SqlParameter[] sqlParameters = userWorkHistoryRepo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@");
                var result = userWorkHistoryRepo.Delete(spName, sqlParameters);
                return result;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}


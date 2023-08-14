using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers
{
    public class UserPhysicalManager
    {
        public static int SaveUserPhysical(UserPhysical userPhysical)
        {
            string spName = "sp_InsertUserPhysical";

            try
            {
                GenericRepository<UserPhysical> physicalRepo = new GenericRepository<UserPhysical>();
                SqlParameter[] sqlParameters = physicalRepo.GetSqlParametersFromObject(userPhysical, spName, "@p_");
                physicalRepo.Insert(spName, sqlParameters);

                return 1;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static int UpdateUserPhysical(UserPhysical userPhysical)
        {
            string spName = "sp_UpdateUserPhysical";

            try
            {
                GenericRepository<UserPhysical> physicalRepo = new GenericRepository<UserPhysical>();
                SqlParameter[] sqlParameters = physicalRepo.GetSqlParametersFromObject(userPhysical, spName, "@p_");
                return physicalRepo.Update(spName, sqlParameters);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static UserPhysical GetByUserID(Int64 p_UserID)
        {
            string spName = "sp_GetUserPhysical";


            SqlParameter[] sqlParameters = new GenericRepository<UserPhysical>().GetSqlParametersFromStoredProcedure(spName);

            foreach (SqlParameter sqlParameter in sqlParameters)
            {
                if ("@" + nameof(p_UserID) == sqlParameter.ParameterName)
                {
                    sqlParameter.Value = p_UserID;
                }
            }

            UserPhysical userPhysical;

            try
            {
                userPhysical = new GenericRepository<UserPhysical>().GetOne(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return userPhysical;
        }

        public static DataTable GetPhysicalDtByUserID(Int64 p_UserID)
        {
            string spName = "sp_GetUserPhysical";

            GenericRepository<UserLicense> physicalRepo = new GenericRepository<UserLicense>();
            dynamic expandoObject = new ExpandoObject();
            expandoObject.p_UserID = p_UserID;
            SqlParameter[] sqlParameters = physicalRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
            DataTable physicalDataTable = null;
            try
            {
                physicalDataTable = physicalRepo.LoadDataTable(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return physicalDataTable;
        }
    }
}

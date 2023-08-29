using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers
{
    public class EmergencyInfoManager
    {
        public static int InsertEmrInfo(UserEmergencyInfo emergencyInfo)
        {
            string spName = "sp_InsertEmrInfo";

            try
            {                
                GenericRepository<UserEmergencyInfo> userEmergencyInfoRepo = new GenericRepository< UserEmergencyInfo > ();
                SqlParameter[] sqlParameters = userEmergencyInfoRepo.GetSqlParametersFromObject(emergencyInfo, spName, "@p_");
                userEmergencyInfoRepo.Insert(spName, sqlParameters); 

                return 1;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static int UpdateEmrInfo(UserEmergencyInfo emergencyInfo)
        {
            string spName = "sp_UpdateEmrInfo";

            try
            {
                GenericRepository<UserEmergencyInfo> userEmergencyInfoRepo = new GenericRepository<UserEmergencyInfo>();
                SqlParameter[] sqlParameters = userEmergencyInfoRepo.GetSqlParametersFromObject(emergencyInfo, spName, "@p_");
                return userEmergencyInfoRepo.Update(spName, sqlParameters);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static bool AlreadyEmrInfoExist(long UserID, byte EmrType)
        {
            bool IsValid = false;
            string spName = "sp_GetEmrInfoByUserIdAndEmrType";
            
            try
            {
                GenericRepository<UserEmergencyInfo> userEmergencyInfoRepo = new GenericRepository<UserEmergencyInfo>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.UserID = UserID;
                expandoObject.EmrType = EmrType;
                SqlParameter[] sqlParameters = userEmergencyInfoRepo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@p_");
                
                if (userEmergencyInfoRepo.DoesExist(spName, sqlParameters))
                {
                    IsValid = true;
                }
                else
                {
                    IsValid = false;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return IsValid;
        }
        public static IEnumerable<UserEmergencyInfo> GetEmrInfo(long UserID)
        {
            string spName = "sp_GetEmrInfoByUserId";

            try
            {
                GenericRepository<UserEmergencyInfo> userEmergencyInfoRepo = new GenericRepository<UserEmergencyInfo>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.UserID = UserID;
                SqlParameter[] sqlParameters = userEmergencyInfoRepo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@p_");

                return userEmergencyInfoRepo.GetAll(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static DataTable GetEmrInfoDataTableByUserID(long UserID, byte EmrType)
        {
            string spName = "sp_GetEmrInfoByUserIdAndEmrType";

            GenericRepository<UserEmergencyInfo> userEmergencyInfoRepo = new GenericRepository<UserEmergencyInfo>();
            dynamic expandoObject = new ExpandoObject();
            expandoObject.UserID = UserID;
            expandoObject.EmrType = EmrType;
            SqlParameter[] sqlParameters = userEmergencyInfoRepo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@p_");
            DataTable emrInfoDataTable = null;
            try
            {
                emrInfoDataTable = userEmergencyInfoRepo.LoadDataTable(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return emrInfoDataTable;
        }
    }
}

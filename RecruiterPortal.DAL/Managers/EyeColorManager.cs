using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers
{
    public class EyeColorManager
    {
        public static IEnumerable<EyeColor> GetEyeColor()
        {
            string spName = "sp_GetEyeColor";
            try
            {
                GenericRepository<EyeColor> eyeColorRepo = new GenericRepository<EyeColor>();
                IEnumerable<EyeColor> eyeColorList = eyeColorRepo.GetAll(spName); ;

                return eyeColorList;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static DataTable GetEyeColorCodeByEyeColor(string EyeColor)
        {
            string spName = "sp_GetEyeColorCodeByEyeColor";
            DataTable eyeColorDataTable = null;

            try
            {
                dynamic expandoObject = new ExpandoObject();
                expandoObject.EyeColor = EyeColor;
                GenericRepository<EyeColor> eyeColorRepo = new GenericRepository<EyeColor>();
                SqlParameter[] sqlParameters = eyeColorRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
                eyeColorDataTable = eyeColorRepo.LoadDataTable(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return eyeColorDataTable;
        }
    }
}

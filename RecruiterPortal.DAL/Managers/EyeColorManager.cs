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
                GenericRepository<EyeColor> view_eye_color_Repo = new GenericRepository<EyeColor>();
                IEnumerable<EyeColor> view_eye_color_List = view_eye_color_Repo.GetAll(spName); ;

                return view_eye_color_List;
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

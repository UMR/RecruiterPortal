using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers
{
    public class HairColorManager
    {
        public static IEnumerable<HairColor> GetHairColor()
        {
            string spName = "sp_GetHairColor";
            try
            {
                GenericRepository<HairColor> view_hair_color_Repo = new GenericRepository<HairColor>();
                IEnumerable<HairColor> view_hair_color_List = view_hair_color_Repo.GetAll(spName); ;

                return view_hair_color_List;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static DataTable GetHairColorCodeByHairColor(string HairColor)
        {
            string spName = "sp_GetHairColorCodeByHairColor";
            DataTable hairColorDataTable = null;

            try
            {
                dynamic expandoObject = new ExpandoObject();
                expandoObject.HairColor = HairColor;
                GenericRepository<HairColor> hairColorRepo = new GenericRepository<HairColor>();
                SqlParameter[] sqlParameters = hairColorRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
                hairColorDataTable = hairColorRepo.LoadDataTable(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return hairColorDataTable;
        }
    }
}

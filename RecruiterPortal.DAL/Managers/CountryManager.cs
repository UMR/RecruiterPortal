using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers
{
    public class CountryManager
    {
        public static IEnumerable<Country> GetCountryName(string countryName)
        {
            string spName = "sp_GetCountryName";
            try
            {
                GenericRepository<Country> view_Country_NameRepo = new GenericRepository<Country>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.CountryName = countryName;
                SqlParameter[] sqlParameters = view_Country_NameRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
                IEnumerable<Country> view_CountryNameList = view_Country_NameRepo.GetAll(spName, sqlParameters); ;

                return view_CountryNameList;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

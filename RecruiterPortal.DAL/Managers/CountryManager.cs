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
                GenericRepository<Country> countryRepo = new GenericRepository<Country>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.CountryName = countryName;
                SqlParameter[] sqlParameters = countryRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
                IEnumerable<Country> countries = countryRepo.GetAll(spName, sqlParameters);

                return countries;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

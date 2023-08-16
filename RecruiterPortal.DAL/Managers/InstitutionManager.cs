using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.ComponentModel;
using System.Dynamic;

namespace RecruiterPortal.DAL.Managers
{
    public class InstitutionManager
    {
        public static IEnumerable<Institution> GetInstitutions(string name)
        {
            string spName = "sp_GetInstitution";
            try
            {
                GenericRepository<Institution> institutionRepo = new GenericRepository<Institution>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.Name = name;
                SqlParameter[] sqlParameters = institutionRepo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@");

                return institutionRepo.GetAll(spName, sqlParameters);                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
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
        public static DataSet GetAllInstitutionByFilter(InstitutionSearchModel institutionSearchModel)
        {

            string spName = "sp_GetAllInstitutionByFilter";
            dynamic expandoObject = new ExpandoObject();
            expandoObject.take = institutionSearchModel.take;
            expandoObject.skip = institutionSearchModel.skip;

            GenericRepository<Institution> institutionRepo = new GenericRepository<Institution>();
            SqlParameter[] sqlParameters = institutionRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
            DataSet institutionDt = null;

            try
            {
                institutionDt = institutionRepo.LoadDataSetTable(spName, sqlParameters);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return institutionDt;
        }
    }
}

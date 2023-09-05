using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers
{
    public class ZipCodeManager
    {
        public static IEnumerable<ViewLookUpZipCode> GetZipCodeCityStateByZipCode(string Zipcode)
        {
            string spName = "sp_GetZipCodeByZipCode";
            try
            {
                GenericRepository<ViewLookUpZipCode> zipCodeRepo = new GenericRepository<ViewLookUpZipCode>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.Zipcode = Zipcode;
                SqlParameter[] sqlParameters = zipCodeRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
                IEnumerable<ViewLookUpZipCode> zipCodes = zipCodeRepo.GetAll(spName, sqlParameters); ;

                return zipCodes;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static IEnumerable<ViewIssuingAuthority> GetIssueingAuthorityByText(string text)
        {
            string spName = "sp_GetIssueingAuthorityByText";
            try
            {
                GenericRepository<ViewIssuingAuthority> issueAuthorityRepo = new GenericRepository<ViewIssuingAuthority>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.IssueAuthority = text;
                SqlParameter[] sqlParameters = issueAuthorityRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
                IEnumerable<ViewIssuingAuthority> issueAuthorityList = issueAuthorityRepo.GetAll(spName, sqlParameters);

                return issueAuthorityList;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static DataTable GetStateCodeByStateName(string stateName)
        {
            string spName = "sp_GetStateCode";

            dynamic expandoObject = new ExpandoObject();
            expandoObject.StateName = stateName;
            GenericRepository<State> stateRepo = new GenericRepository<State>();
            SqlParameter[] sqlParameters = stateRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
            DataTable stateDataTable = null;
            try
            {
                stateDataTable = stateRepo.LoadDataTable(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return stateDataTable;
        }
    }
}

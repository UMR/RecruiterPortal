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

        public static async Task<long> Insert(InstitutionRequestModel request, int recruiterId)
        {
            try
            {
                GenericRepository<State> stateRepo = new GenericRepository<State>();
                State state = await stateRepo.GetByIdAsync(s => s.StateCode == request.StateCode);
                if (state != null)
                {
                    request.StateCode = state.StateId.ToString();
                }
                GenericRepository<Institution> repository = new GenericRepository<Institution>();
                Institution institution = MapApplicantStatusRequest(true, request, recruiterId);
                Institution createdApplicantStatus = await repository.SaveAsync(institution);
                return createdApplicantStatus.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        private static Institution MapApplicantStatusRequest(bool isInsert, InstitutionRequestModel request, int recruiterId)
        {
            Institution institution = new Institution();
            institution.Id = request.Id;
            institution.InstituteName = request.InstituteName;
            institution.Telephone = request.Telephone;
            institution.ZipCode = request.ZipCode;
            institution.County = request.County;
            institution.StateId = Convert.ToInt32(request.StateCode);
            institution.Town = request.Town;
            institution.Website = request.Website;
            institution.Address = request.Address;
            institution.IsActive = request.IsActive;
            if (isInsert)
            {
                institution.CreatedBy = recruiterId;
                institution.CreatedDate = DateTime.Now;
            }
            else
            {
                institution.UpdatedBy = recruiterId;
                institution.UpdatedDate = DateTime.Now;
            }
            return institution;
        }
    }
}

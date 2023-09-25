using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortal.DAL.Managers
{
    public class RecruiterMailConfigManager
    {
        public static async Task<RecruiterMailConfigResponse> GetRecruiterMailConfigById(int id)
        {
            try
            {
                RecruiterMailConfigResponse recruiterMailConfigResponse = null;
                GenericRepository<RecruiterMailConfig> repository = new GenericRepository<RecruiterMailConfig>();
                var recruiterMailConfig = await repository.GetByIdAsync(m => m.Id == id);
                if (recruiterMailConfig != null)
                {
                    recruiterMailConfigResponse = MapRecruiterMailConfigResponse(recruiterMailConfig);
                }

                return recruiterMailConfigResponse;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static async Task<List<RecruiterMailConfigResponse>> GetRecruiterMailConfigsByRecruiterId(int recruiterId)
        {
            try
            {
                List<RecruiterMailConfigResponse> recruiterMailConfigResponseList = new List<RecruiterMailConfigResponse>();
                GenericRepository<RecruiterMailConfig> repository = new GenericRepository<RecruiterMailConfig>();
                var recruiterMailConfigs = await repository.GetAllAsync(m => m.RecruiterId == recruiterId);
                if (recruiterMailConfigs != null && recruiterMailConfigs.Count() > 0)
                {
                    recruiterMailConfigResponseList = MapRecruiterMailConfigResponse(recruiterMailConfigs.ToList());
                }

                return recruiterMailConfigResponseList;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private static List<RecruiterMailConfigResponse> MapRecruiterMailConfigResponse(List<RecruiterMailConfig> request)
        {
            List<RecruiterMailConfigResponse> recruiterMailConfigs = new List<RecruiterMailConfigResponse>();
            foreach (var recruiterMailConfig in request)
            {
                recruiterMailConfigs.Add(MapRecruiterMailConfigResponse(recruiterMailConfig));
            }

            return recruiterMailConfigs;
        }

        private static RecruiterMailConfigResponse MapRecruiterMailConfigResponse(RecruiterMailConfig request)
        {
            RecruiterMailConfigResponse response = new RecruiterMailConfigResponse();
            response.Id = request.Id;
            response.ProfileName = request.ProfileName;
            response.RecruiterId = request.RecruiterId;
            response.Email = request.Email;
            response.GoogleRefreshToken = request.GoogleRefreshToken;
            response.GoogleDriveFolderId = request.GoogleDriveFolderId;
            response.IsGoogleApiError = request.IsGoogleApiError;
            response.CreatedBy = request.CreatedBy;
            response.CreatedDate = request.CreatedDate;
            response.UpdatedBy = request.UpdatedBy;
            response.UpdatedDate = request.UpdatedDate;

            return response;
        }
    }
}

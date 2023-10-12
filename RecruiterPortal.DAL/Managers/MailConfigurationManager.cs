using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortalDAL.Managers
{
    public interface IMailConfigurationManager
    {
        Task<int> Create(MailConfigurationRequest request, int recruiterId);        
        Task<bool?> Update(MailConfigurationRequest request, int recruiterId);
        Task<bool?> Delete(int id);
        Task<MailConfigurationResponse> GetMailConfigById(int id);
        Task<List<MailConfigurationResponse>> GetMailConfigByRecruiterId(int recruiterId);
    }

    public class MailConfigurationManager : IMailConfigurationManager
    {
        public async Task<int> Create(MailConfigurationRequest request, int recruiterId)
        {
            try
            {
                GenericRepository<RecruiterMailConfig> repository = new GenericRepository<RecruiterMailConfig>();
                RecruiterMailConfig mailConfigToCreate = MapMailConfigCreateRequest(request, recruiterId);
                RecruiterMailConfig createdMailConfig = await repository.SaveAsync(mailConfigToCreate);
                return createdMailConfig.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool?> Update(MailConfigurationRequest request, int recruiterId)
        {
            try
            {
                GenericRepository<RecruiterMailConfig> repository = new GenericRepository<RecruiterMailConfig>();
                RecruiterMailConfig mailConfig = await repository.GetByIdAsync(m => m.Id == request.Id);
                if (mailConfig != null)
                {
                    var mailConfigToUpdate = MapMailConfigUpdateRequest(request, mailConfig, recruiterId);
                    return await repository.UpdateAsync(mailConfigToUpdate) > 0 ? true : false;
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool?> Delete(int id)
        {
            try
            {
                GenericRepository<RecruiterMailConfig> repository = new GenericRepository<RecruiterMailConfig>();
                RecruiterMailConfig mailConfig = await repository.GetByIdAsync(s => s.Id == id);
                if (mailConfig != null)
                {
                    return await repository.DeleteAsync(mailConfig) > 0 ? true : false; ;
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MailConfigurationResponse> GetMailConfigById(int id)
        {
            try
            {
                MailConfigurationResponse mailConfiguration = null;
                GenericRepository<RecruiterMailConfig> repository = new GenericRepository<RecruiterMailConfig>();
                var mailConfigurationFromDb = await repository.GetByIdAsync(m => m.Id == id);
                if (mailConfigurationFromDb != null)
                {
                    mailConfiguration = MapMailConfigurationResponse(mailConfigurationFromDb);
                }

                return mailConfiguration;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<MailConfigurationResponse>> GetMailConfigByRecruiterId(int recruiterId)
        {
            try
            {
                List<MailConfigurationResponse> mailConfigs = new List<MailConfigurationResponse>();
                GenericRepository<RecruiterMailConfig> repository = new GenericRepository<RecruiterMailConfig>();
                var mailConfigsFromDb = await repository.GetAllAsync(m => m.RecruiterId == recruiterId);
                if (mailConfigsFromDb != null)
                {
                    foreach (var mailTemplateTypeFromDb in mailConfigsFromDb)
                    {
                        MailConfigurationResponse mailConfiguration = MapMailConfigurationResponse(mailTemplateTypeFromDb);
                        mailConfigs.Add(mailConfiguration);
                    }
                }

                return mailConfigs;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private MailConfigurationResponse MapMailConfigurationResponse(RecruiterMailConfig request)
        {
            MailConfigurationResponse response = new MailConfigurationResponse();
            response.Id = request.Id;
            response.RecruiterId = request.RecruiterId;
            response.ProfileName = request.ProfileName;
            response.EmailAddress = request.Email;
            response.GoogleRefreshToken = request.GoogleRefreshToken;
            response.IsGoogleApiError = response.IsGoogleApiError;
            return response;
        }

        private RecruiterMailConfig MapMailConfigCreateRequest(MailConfigurationRequest request, int recruiterId)
        {
            RecruiterMailConfig mailConfig = new RecruiterMailConfig();
            mailConfig.RecruiterId = recruiterId;
            mailConfig.ProfileName = request.ProfileName;
            mailConfig.Email = request.EmailAddress;
            mailConfig.GoogleRefreshToken = request.GoogleRefreshToken;
            mailConfig.CreatedBy = recruiterId;
            mailConfig.CreatedDate = DateTime.Now;
            return mailConfig;
        }

        private RecruiterMailConfig MapMailConfigUpdateRequest(MailConfigurationRequest request, RecruiterMailConfig mailConfig, int recruiterId)
        {
            mailConfig.Id = request.Id;
            mailConfig.RecruiterId = recruiterId;
            mailConfig.ProfileName = request.ProfileName;
            mailConfig.Email = request.EmailAddress;
            mailConfig.GoogleRefreshToken = request.GoogleRefreshToken;
            mailConfig.UpdatedBy = recruiterId;
            mailConfig.UpdatedDate = DateTime.Now;
            return mailConfig;
        }
    }
}

using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortal.DAL.Managers
{
    public class MailTemplateManager
    {
        private static MailTemplate MapMailTemplateCreateRequest(MailTemplateRequest request, int recruiterId)
        {
            MailTemplate mailTemplate = new MailTemplate();
            mailTemplate.RecruiterId = recruiterId;
            mailTemplate.RecruiterMailConfigId = request.RecruiterMailConfigId;
            mailTemplate.TemplateText = request.TemplateText;
            mailTemplate.MailTemplateTypeId = request.MailTemplateTypeId;
            mailTemplate.CreatedBy = recruiterId;
            mailTemplate.CreatedDate = DateTime.Now;
            return mailTemplate;
        }

        private static MailTemplate MapMailTemplateUpdateRequest(MailTemplateRequest request, MailTemplate mailTemplate, int recruiterId)
        {
            mailTemplate.Id = request.Id;
            mailTemplate.RecruiterId = recruiterId;
            mailTemplate.RecruiterMailConfigId = request.RecruiterMailConfigId;
            mailTemplate.TemplateText = request.TemplateText;
            mailTemplate.MailTemplateTypeId = request.MailTemplateTypeId;
            mailTemplate.UpdatedBy = recruiterId;
            mailTemplate.UpdatedDate = DateTime.Now;
            return mailTemplate;
        }

        private static MailTemplateResponse MapMailTemplateResponse(MailTemplate mailTemplate)
        {
            MailTemplateResponse response = new MailTemplateResponse();
            response.Id = mailTemplate.Id;
            response.RecruiterId = mailTemplate.RecruiterId;
            response.RecruiterMailConfigId = mailTemplate.RecruiterMailConfigId;
            response.TemplateText = mailTemplate.TemplateText;
            response.MailTemplateTypeId = mailTemplate.MailTemplateTypeId;
            response.CreatedBy = mailTemplate.CreatedBy;
            response.CreatedDate = mailTemplate.CreatedDate;
            response.UpdatedBy = mailTemplate.UpdatedBy;
            response.UpdatedDate = mailTemplate.UpdatedDate;
            return response;
        }

        public static async Task<MailTemplateResponse> GetMailTemplate(int recruiterMailConfigId, int mailTemplateTypeId)
        {
            GenericRepository<MailTemplate> repository = new GenericRepository<MailTemplate>();
            MailTemplate mailTemplate = await repository.GetByIdAsync(m => m.RecruiterMailConfigId == recruiterMailConfigId && m.MailTemplateTypeId == mailTemplateTypeId);
            if (mailTemplate == null)
            {
                return null;
            }

            MailTemplateResponse response = MapMailTemplateResponse(mailTemplate);
            return response;
        }

        public static async Task<int> Create(MailTemplateRequest request, int recruiterId)
        {
            try
            {
                GenericRepository<MailTemplate> repository = new GenericRepository<MailTemplate>();
                MailTemplate mailTemplateToCreate = MapMailTemplateCreateRequest(request, recruiterId);
                MailTemplate createdMailTemplate = await repository.SaveAsync(mailTemplateToCreate);
                return createdMailTemplate.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static async Task<bool?> Update(MailTemplateRequest request, int recruiterId)
        {
            try
            {
                GenericRepository<MailTemplate> repository = new GenericRepository<MailTemplate>();
                MailTemplate mailTemplate = await repository.GetByIdAsync(m => m.Id == request.Id);
                if (mailTemplate != null)
                {
                    var mailTemplateToUpdate = MapMailTemplateUpdateRequest(request, mailTemplate, recruiterId);
                    return await repository.UpdateAsync(mailTemplateToUpdate) > 0 ? true : false;
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

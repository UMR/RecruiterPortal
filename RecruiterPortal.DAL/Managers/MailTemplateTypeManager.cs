using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortal.DAL.Managers
{
    public class MailTemplateTypeManager
    {
        private static MailTemplateType MapMailTemplateTypeRequest(bool isInsert, MailTemplateType request, int recruiterId)
        {
            MailTemplateType mailTemplateType = null;
            if (isInsert)
            {
                mailTemplateType = new MailTemplateType();
                mailTemplateType.RecruiterId = recruiterId;
                mailTemplateType.Name = request.Name;
                mailTemplateType.CreatedBy = recruiterId;
                mailTemplateType.CreatedDate = DateTime.Now;
            }
            else
            {
                mailTemplateType.Id = request.Id;
                mailTemplateType.RecruiterId = recruiterId;
                mailTemplateType.Name = request.Name;
                mailTemplateType.UpdatedBy = recruiterId;
                mailTemplateType.UpdatedDate = DateTime.Now;
            }
            return mailTemplateType;
        }
        public static async Task<int> Create(MailTemplateType request, int recruiterId)
        {
            try
            {
                GenericRepository<MailTemplateType> repository = new GenericRepository<MailTemplateType>();
                MailTemplateType mailTemplateType = MapMailTemplateTypeRequest(true, request, recruiterId);
                MailTemplateType createdMailTemplateType = await repository.SaveAsync(mailTemplateType);
                return createdMailTemplateType.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<bool?> Update(MailTemplateType request, int recruiterId)
        {
            try
            {
                GenericRepository<MailTemplateType> repository = new GenericRepository<MailTemplateType>();
                MailTemplateType mailTemplateType = await repository.GetByIdAsync(m => m.Id == request.Id);
                if (mailTemplateType != null)
                {
                    MapMailTemplateTypeRequest(false, request, recruiterId);
                    return await repository.UpdateAsync(mailTemplateType) > 0 ? true : false;
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<bool?> Delete(int id)
        {
            try
            {
                GenericRepository<MailTemplateType> repository = new GenericRepository<MailTemplateType>();
                MailTemplateType mailTemplateType = await repository.GetByIdAsync(s => s.Id == id);
                if (mailTemplateType != null)
                {
                    return await repository.DeleteAsync(mailTemplateType) > 0 ? true : false; ;
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static async Task<List<MailTemplateTypeResponse>> GetMailTemplateTypeByRecruiterId(int recruiterId)
        {
            try
            {
                List<MailTemplateTypeResponse> mailTemplateTypes = new List<MailTemplateTypeResponse>();
                GenericRepository<MailTemplateType> repository = new GenericRepository<MailTemplateType>();
                var mailTemplateTypesFromDb = await repository.GetAllAsync(m => m.RecruiterId == recruiterId);

                foreach (var mailTemplateType in mailTemplateTypes)
                {
                    MailTemplateTypeResponse mailTemplateTypeResponse = new MailTemplateTypeResponse();
                    mailTemplateTypeResponse.Id = mailTemplateType.Id;
                    mailTemplateTypeResponse.Name = mailTemplateType.Name;
                    mailTemplateTypeResponse.CreatedBy = mailTemplateType.CreatedBy;
                    mailTemplateTypeResponse.CreatedDate = mailTemplateType.CreatedDate;
                    mailTemplateTypeResponse.UpdatedBy = mailTemplateType.UpdatedBy;
                    mailTemplateTypeResponse.UpdatedDate = mailTemplateType.UpdatedDate;
                }

                return mailTemplateTypes;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

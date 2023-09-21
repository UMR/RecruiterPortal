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

        private static MailTemplateTypeResponse MapMailTemplateTypeResponse(MailTemplateType request) 
        {
            MailTemplateTypeResponse response = new MailTemplateTypeResponse();
            response.Id = request.Id;
            response.RecruiterId = request.RecruiterId;
            response.Name = request.Name;
            response.CreatedBy = request.CreatedBy;
            response.CreatedDate = request.CreatedDate;
            response.UpdatedBy = request.UpdatedBy;
            response.UpdatedDate = request.UpdatedDate;

            return response;
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

        public static async Task<MailTemplateTypeResponse> GetMailTemplateTypeById(int id)
        {
            try
            {
                MailTemplateTypeResponse mailTemplateType = null;
                GenericRepository<MailTemplateType> repository = new GenericRepository<MailTemplateType>();
                var mailTemplateTypeFromDb = await repository.GetByIdAsync(m => m.Id == id);
                if (mailTemplateTypeFromDb != null)
                {
                    mailTemplateType = MapMailTemplateTypeResponse(mailTemplateTypeFromDb);
                }

                return mailTemplateType;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static async Task<List<MailTemplateTypeResponse>> GetMailTemplateTypesByRecruiterId(int recruiterId)
        {
            try
            {
                List<MailTemplateTypeResponse> mailTemplateTypes = new List<MailTemplateTypeResponse>();
                GenericRepository<MailTemplateType> repository = new GenericRepository<MailTemplateType>();
                var mailTemplateTypesFromDb = await repository.GetAllAsync(m => m.RecruiterId == recruiterId);
                if (mailTemplateTypesFromDb != null)
                {
                    foreach (var mailTemplateTypeFromDb in mailTemplateTypesFromDb)
                    {
                        MailTemplateTypeResponse mailTemplateType = MapMailTemplateTypeResponse(mailTemplateTypeFromDb);
                        mailTemplateTypes.Add(mailTemplateType);
                    }
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

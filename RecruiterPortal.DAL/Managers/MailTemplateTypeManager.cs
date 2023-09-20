using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortal.DAL.Managers
{
    public class MailTemplateTypeManager
    {
        private static MailTemplateType MapMailTemplateTypeRequest(bool isInsert, MailTemplateType request, int recruiterId)
        {
            MailTemplateType mailTemplateType = new MailTemplateType();
            mailTemplateType.Id = request.Id;
            if (isInsert)
            {
                mailTemplateType.CreatedBy = recruiterId;
                mailTemplateType.CreatedDate = DateTime.Now;
            }
            else
            {
                mailTemplateType.UpdatedBy = recruiterId;
                mailTemplateType.UpdatedDate = DateTime.Now;
            }
            return mailTemplateType;
        }
        public static async Task<long> Insert(MailTemplateType request, int recruiterId)
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
        public static async Task<int> Update(MailTemplateType request, int recruiterId)
        {
            try
            {
                GenericRepository<MailTemplateType> repository = new GenericRepository<MailTemplateType>();
                MailTemplateType mailTemplateType = MapMailTemplateTypeRequest(false, request, recruiterId);
                return await repository.UpdateAsync(mailTemplateType);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<int?> Delete(int id)
        {
            try
            {
                int? result = null;
                GenericRepository<MailTemplateType> repository = new GenericRepository<MailTemplateType>();
                MailTemplateType mailTemplateType = await repository.GetByIdAsync(s => s.Id == id);

                if (mailTemplateType != null)
                {
                    result = await repository.DeleteAsync(mailTemplateType);
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //public static List<MailTemplateTypeResponse> GetApplicantStatusByAgencyId(int recruiterId)
        //{
        //    try
        //    {
        //        IEnumerable<MailTemplateTypeResponse> mailTemplateTypes = Array.Empty<MailTemplateTypeResponse>();
        //        using (UmrrecruitmentApplicantContext context = new UmrrecruitmentApplicantContext()) 
        //        {
        //            var mailTemplateTypes = context.MailTemplateTypes.Where(m=>m.re);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //}
    }
}

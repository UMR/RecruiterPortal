using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Collections;
using static RecruiterPortal.DAL.Utility.Utility;

namespace RecruiterPortal.DAL.Managers
{
    public class ApplicantResumeManager
    {
        
        private static ApplicantAttachment MapApplicantStatusRequest(ApplicantResumeRequestModel request, int requiterId)
        {
            ApplicantAttachment applicantResume = new ApplicantAttachment();
            applicantResume.Id = request.Id;
            applicantResume.ApplicantId = request.ApplicantId;
            applicantResume.Title = request.FileName;
            applicantResume.FileName = request.FileName;
            applicantResume.FileData = request.FileData;
            applicantResume.CreatedBy = requiterId;
            applicantResume.CreatedDate = DateTime.Now;

            return applicantResume;
        }

        public static async Task<long> Insert(ApplicantResumeRequestModel request, int requiterId)
        {
            try
            {
                GenericRepository<ApplicantAttachment> repository = new GenericRepository<ApplicantAttachment>();
                ApplicantAttachment applicantResume = MapApplicantStatusRequest(request, requiterId);
                ApplicantAttachment createdApplicantResume = await repository.SaveAsync(applicantResume);
                return createdApplicantResume.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<long?> Delete(long id)
        {
            try
            {
                int? result = null;
                GenericRepository<ApplicantAttachment> repository = new GenericRepository<ApplicantAttachment>();
                ApplicantAttachment resume = await repository.GetByIdAsync(s => s.Id == id);

                if (resume != null)
                {
                    result = await repository.DeleteAsync(resume);
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<List<ApplicantAttachment>> GetApplicantResumeByAppId(long id)
        {
            try
            {
                List<ApplicantAttachment> resumeResponseList = new List<ApplicantAttachment>();
                GenericRepository<ApplicantAttachment> repository = new GenericRepository<ApplicantAttachment>();
                var resume = await repository.GetAllAsync(m => m.ApplicantId == id);
                if (resume != null && resume.Count() > 0)
                {
                    resumeResponseList = resume.ToList();
                }

                return resumeResponseList;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}

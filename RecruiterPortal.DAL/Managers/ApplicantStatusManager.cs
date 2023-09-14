using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortal.DAL.Managers
{
    public class ApplicantStatusManager
    {
        private static ApplicantStatus MapApplicantStatusRequest(bool isInsert, ApplicantStatusRequestModel request, long agencyId, int recruiterId)
        {
            ApplicantStatus applicantStatus = new ApplicantStatus();
            applicantStatus.Id = request.Id;
            applicantStatus.AgencyId = agencyId;
            applicantStatus.ApplicantId = request.ApplicantId;
            applicantStatus.PositionId = request.PositionId;
            applicantStatus.InstitutionId = request.InstitutionId;
            applicantStatus.Status = request.Status;
            applicantStatus.Date = request.Date;
            applicantStatus.TotalFee = request.TotalFee;
            applicantStatus.NetFee = request.NetFee;
            applicantStatus.RefFee = request.RefFee;
            applicantStatus.CurrentSalary = request.CurrentSalary;
            applicantStatus.ExpectedSalary = request.ExpectedSalary;
            applicantStatus.ProfileStatus = request.ProfileStatus;
            applicantStatus.Shift = request.Shift;
            if (isInsert)
            {
                applicantStatus.CreatedBy = recruiterId;
                applicantStatus.CreatedDate = DateTime.Now;
            }
            else
            {
                applicantStatus.UpdatedBy = recruiterId;
                applicantStatus.UpdatedDate = DateTime.Now;
            }
            return applicantStatus;
        }
        public static async Task<long> Insert(ApplicantStatusRequestModel request, long agencyId, int recruiterId)
        {
            try
            {
                GenericRepository<ApplicantStatus> repository = new GenericRepository<ApplicantStatus>();
                ApplicantStatus applicantStatus = MapApplicantStatusRequest(true, request, agencyId, recruiterId);
                ApplicantStatus createdApplicantStatus = await repository.SaveAsync(applicantStatus);
                return createdApplicantStatus.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<int> Update(ApplicantStatusRequestModel request, long agencyId, int recruiterId)
        {
            try
            {
                GenericRepository<ApplicantStatus> repository = new GenericRepository<ApplicantStatus>();
                ApplicantStatus applicantStatus = MapApplicantStatusRequest(false, request, agencyId, recruiterId);
                return await repository.UpdateAsync(applicantStatus);
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
                GenericRepository<ApplicantStatus> repository = new GenericRepository<ApplicantStatus>();
                ApplicantStatus applicantStatus = await repository.GetByIdAsync(s => s.Id == id);

                if (applicantStatus != null)
                {
                    result = await repository.DeleteAsync(applicantStatus);
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static PagedResponse<JobResponseModel> GetApplicantStatusByAgencyId(long agencyId, int skip, int take)
        {
            try
            {
                IEnumerable<JobResponseModel> jobs = Array.Empty<JobResponseModel>();
                int jobsCount = 0;

                using (UmrrecruitmentApplicantContext context = new UmrrecruitmentApplicantContext())
                {
                    jobsCount = (from job in context.Jobs
                                 join pos in context.Positions
                                 on job.JobId equals pos.Id
                                 join ins in context.Institutions
                                 on job.JobId equals ins.Id
                                 where job.AgencyId == agencyId
                                 select job).Count();

                    jobs = (from job in context.Jobs
                            join pos in context.Positions
                            on job.JobId equals pos.Id
                            join ins in context.Institutions
                            on job.JobId equals ins.Id
                            where job.AgencyId == agencyId
                            select (new JobResponseModel
                            {
                                JobId = job.JobId,
                                Status = job.Status,
                                JobTitle = job.JobTitle,
                                JobDescription = job.JobDescription,
                                PositionId = job.PositionId,
                                Position = pos.PositionName,
                                InstituteId = ins.Id,
                                Institute = ins.InstituteName,
                                AgencyId = job.AgencyId,
                                CreatedBy = job.CreatedBy,
                                CreatedDate = job.CreatedDate,
                                UpdatedBy = job.UpdatedBy,
                                UpdatedDate = job.UpdatedDate
                            })
                           ).Skip(skip).Take(take)
                           .ToList();
                }

                return new PagedResponse<JobResponseModel> { Records = jobs, TotalRecords = jobsCount };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<ApplicantStatus> GetApplicantStatusById(long id)
        {
            try
            {
                GenericRepository<ApplicantStatus> repository = new GenericRepository<ApplicantStatus>();
                return await repository.GetByIdAsync(p => p.Id == id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static JobResponseModel GetApplicantStatusRelated(int jobId)
        {
            JobResponseModel response = null;
            using (UmrrecruitmentApplicantContext context = new UmrrecruitmentApplicantContext())
            {
                response = (from job in context.Jobs
                            join pos in context.Positions
                            on job.JobId equals pos.Id
                            join ins in context.Institutions
                            on job.JobId equals ins.Id
                            where job.JobId == jobId
                            select (new JobResponseModel
                            {
                                JobId = job.JobId,
                                Status = job.Status,
                                JobTitle = job.JobTitle,
                                JobDescription = job.JobDescription,
                                PositionId = job.PositionId,
                                Position = pos.PositionName,
                                InstituteId = ins.Id,
                                Institute = ins.InstituteName,
                                AgencyId = job.AgencyId,
                                CreatedBy = job.CreatedBy,
                                CreatedDate = job.CreatedDate,
                                UpdatedBy = job.UpdatedBy,
                                UpdatedDate = job.UpdatedDate
                            })
                       ).FirstOrDefault();
            }

            return response;
        }
    }
}

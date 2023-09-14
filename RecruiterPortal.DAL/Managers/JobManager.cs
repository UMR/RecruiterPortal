using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortal.DAL.Managers
{
    public class JobManager
    {
        private static Job MapJobRequest(bool isInsert, JobRequestModel request, long agencyId, int recruiterId)
        {
            Job job = new Job();
            job.JobId = request.JobId;
            job.Status = request.Status;
            job.JobTitle = request.JobTitle;
            job.JobDescription = request.JobDescription;
            job.PositionId = request.PositionId;
            job.InstituteId = request.InstituteId;
            job.AgencyId = agencyId;
            if (isInsert)
            {
                job.CreatedBy = recruiterId;
                job.CreatedDate = DateTime.Now;
            }
            else
            {
                job.UpdatedBy = recruiterId;
                job.UpdatedDate = DateTime.Now;
            }
            return job;
        }
        public static async Task<int> Insert(JobRequestModel request, long agencyId, int recruiterId)
        {
            try
            {
                GenericRepository<Job> repository = new GenericRepository<Job>();
                Job job = MapJobRequest(true, request, agencyId, recruiterId);
                Job createdJob = await repository.SaveAsync(job);
                return createdJob.JobId;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<int> Update(JobRequestModel request, long agencyId, int recruiterId)
        {
            try
            {
                GenericRepository<Job> repository = new GenericRepository<Job>();
                Job job = MapJobRequest(false, request, agencyId, recruiterId);
                return await repository.UpdateAsync(job);
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
                GenericRepository<Job> repository = new GenericRepository<Job>();
                Job job = await repository.GetByIdAsync(j => j.JobId == id);

                if (job != null)
                {
                    result = await repository.DeleteAsync(job);
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static PagedResponse<JobResponseModel> GetJobByAgencyId(long agencyId, int skip, int take)
        {
            try
            {
                IEnumerable<JobResponseModel> jobs = null;
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
        public static async Task<Job> GetJobById(int jobId)
        {
            try
            {
                GenericRepository<Job> repository = new GenericRepository<Job>();
                return await repository.GetByIdAsync(p => p.JobId == jobId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static JobResponseModel GetJobByIdWithRelated(int jobId)
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

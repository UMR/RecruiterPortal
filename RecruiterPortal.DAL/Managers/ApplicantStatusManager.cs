using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Collections;
using static RecruiterPortal.DAL.Utility.Utility;

namespace RecruiterPortal.DAL.Managers
{
    public class ApplicantStatusManager
    {
        public static List<StatusModel> GetAllStatus()
        {
            try
            {
                List<StatusModel> statusModelList = new List<StatusModel>();
                foreach (EnumApplicantStatus item in Enum.GetValues(typeof(EnumApplicantStatus)))
                {
                    StatusModel statusModel = new StatusModel();
                    statusModel.StatusId = ((int)item).ToString();
                    statusModel.StatusName = GetEnumDescription(item);
                    statusModelList.Add(statusModel);
                }
                return statusModelList;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        private static ApplicantStatus MapApplicantStatusRequest(bool isInsert, ApplicantStatusRequestModel request, long agencyId, int recruiterId)
        {
            ApplicantStatus applicantStatus = new ApplicantStatus();
            applicantStatus.Id = request.Id;
            applicantStatus.AgencyId = agencyId;
            applicantStatus.ApplicantId = request.ApplicantId;
            applicantStatus.PositionId = request.PositionId;
            applicantStatus.InstitutionId = request.InstitutionId;
            applicantStatus.Status = request.Status;
            applicantStatus.Date = DateTime.Now;
            applicantStatus.TotalFee = request.TotalFee;
            applicantStatus.NetFee = request.NetFee;
            applicantStatus.RefFee = request.RefFee;
            applicantStatus.CurrentSalary = request.CurrentSalary;
            applicantStatus.ExpectedSalary = request.ExpectedSalary;
            applicantStatus.ProfileStatus = request.ProfileStatus;
            applicantStatus.Shift = request.Shift;
            applicantStatus.IsActive = request.IsActive;
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
        public static async Task<long> UpdateBeforeInsert(ApplicantStatusRequestModel request, long agencyId, int recruiterId)
        {
            try
            {
                await UpdateStatus(request, false, recruiterId);

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
        public static async Task<bool?> UpdateStatus(ApplicantStatusRequestModel request, bool isActive, int recruiterId)
        {
            try
            {
                GenericRepository<ApplicantStatus> repository = new GenericRepository<ApplicantStatus>();
                ApplicantStatus status = await repository.GetByIdAsync(p => p.ApplicantId == request.ApplicantId && p.IsActive == true);
                if (status != null)
                {
                    status.IsActive = isActive;
                    status.UpdatedDate = DateTime.Now;
                    status.UpdatedBy = recruiterId;
                    if (status != null)
                    {
                        return await repository.UpdateAsync(status) > 0 ? true : false;
                    }
                }

                return null;
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
        public static async Task<string> GetApplicantActiveStatusById(int applicantId)
        {
            try
            {
                string currentStatus = string.Empty;
                using (UmrrecruitmentApplicantContext context = new UmrrecruitmentApplicantContext())
                {
                    GenericRepository<ApplicantStatus> repository = new GenericRepository<ApplicantStatus>();
                    var activeStatus = await repository.GetByIdAsync(p => p.ApplicantId == applicantId && p.IsActive == true);
                    if (activeStatus != null)
                    {
                        currentStatus = GetEnumDescription((EnumApplicantStatus)(activeStatus.Status));
                    }
                }
                return currentStatus;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static List<ApplicantStatusResponseModel> GetApplicantByStatus(long agencyId, int statusId)
        {
            try
            {
                List<ApplicantStatusResponseModel> applicantStatusList = null;
                GenericRepository<ApplicantStatus> repository = new GenericRepository<ApplicantStatus>();
                using (UmrrecruitmentApplicantContext context = new UmrrecruitmentApplicantContext())
                {
                    applicantStatusList = (from applicantStatus in context.ApplicantStatuses
                                           join pos in context.Positions on applicantStatus.PositionId equals pos.Id
                                           join ins in context.Institutions on applicantStatus.InstitutionId equals ins.Id
                                           into ins2
                                           from institution in ins2.DefaultIfEmpty()
                                           join app in context.Users
                                           on applicantStatus.ApplicantId equals app.UserId
                                           where applicantStatus.AgencyId == agencyId && applicantStatus.Status == statusId && applicantStatus.IsActive == true
                                           select (new ApplicantStatusResponseModel
                                           {
                                               Id = applicantStatus.Id,
                                               ApplicantId = applicantStatus.ApplicantId,
                                               ApplicantName = app.FirstName + " " + app.LastName,
                                               PositionId = pos.Id,
                                               PositionName = pos.PositionName,
                                               InstitutionId = applicantStatus.InstitutionId != null ? applicantStatus.InstitutionId : null,
                                               InstitutionName = institution.InstituteName != null ? institution.InstituteName : null,
                                               Date = applicantStatus.Date,
                                               CurrentSalary = applicantStatus.CurrentSalary,
                                               ExpectedSalary = applicantStatus.ExpectedSalary,
                                           })
                           ).ToList();

                }

                return applicantStatusList;
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

        public static async Task<ApplicantStatusCountModel> GetApplicantStatusCount(long agencyId)
        {
            try
            {
                GenericRepository<ApplicantStatus> repository = new GenericRepository<ApplicantStatus>();
                var newLeads = await repository.GetAllAsyncCount(u => u.Status == (int)EnumApplicantStatus.NewLeads && u.IsActive == true && u.AgencyId == agencyId);
                repository = new GenericRepository<ApplicantStatus>();
                var preScreened = await repository.GetAllAsyncCount(u => u.Status == (int)EnumApplicantStatus.PreScreened && u.IsActive == true && u.AgencyId == agencyId);
                repository = new GenericRepository<ApplicantStatus>();
                var phoneScreened = await repository.GetAllAsyncCount(u => u.Status == (int)EnumApplicantStatus.PhoneScreened && u.IsActive == true && u.AgencyId == agencyId);
                repository = new GenericRepository<ApplicantStatus>();
                var finalInterview = await repository.GetAllAsyncCount(u => u.Status == (int)EnumApplicantStatus.FinalInterview && u.IsActive == true && u.AgencyId == agencyId);
                repository = new GenericRepository<ApplicantStatus>();
                var offered = await repository.GetAllAsyncCount(u => u.Status == (int)EnumApplicantStatus.Offered && u.IsActive == true && u.AgencyId == agencyId);
                repository = new GenericRepository<ApplicantStatus>();
                var accepted = await repository.GetAllAsyncCount(u => u.Status == (int)EnumApplicantStatus.Accepted && u.IsActive == true && u.AgencyId == agencyId);
                repository = new GenericRepository<ApplicantStatus>();
                var refused = await repository.GetAllAsyncCount(u => u.Status == (int)EnumApplicantStatus.Refused && u.IsActive == true && u.AgencyId == agencyId);
                repository = new GenericRepository<ApplicantStatus>();
                var rejected = await repository.GetAllAsyncCount(u => u.Status == (int)EnumApplicantStatus.Rejected && u.IsActive == true && u.AgencyId == agencyId);

                ApplicantStatusCountModel applicantCountModel = new ApplicantStatusCountModel();
                applicantCountModel.NewLeads = newLeads.ToString();
                applicantCountModel.PreScreened = preScreened.ToString();
                applicantCountModel.PhoneScreened = phoneScreened.ToString();
                applicantCountModel.FinalInterview = finalInterview.ToString();
                applicantCountModel.Offered = offered.ToString();
                applicantCountModel.Accepted = accepted.ToString();
                applicantCountModel.Refused = refused.ToString();
                applicantCountModel.Rejected = rejected.ToString();
                return applicantCountModel;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

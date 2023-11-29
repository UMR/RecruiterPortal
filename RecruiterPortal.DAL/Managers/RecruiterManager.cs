using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortal.DAL.Utility;
using RecruiterPortalDAL.Models;
using System.Data;
using System.Dynamic;

namespace RecruiterPortal.DAL.Managers
{
    public class RecruiterManager
    {
        public static bool ValidateRecruiter(string loginId, string password, long agencyId, bool useEncryption = true)
        {
            bool isValidRecruiter = false;
            string spName = "sp_ValidateRecruiter";
            dynamic recruiter = new ExpandoObject();
            recruiter.LoginId = loginId;
            recruiter.AgencyId = agencyId;

            if (!useEncryption)
            {
                recruiter.Password = password.Trim();
            }
            else
            {
                recruiter.Password = SHA256Hasher.GetSHA256Hash(AESEncryptor.EncryptStringToBytes_Aes(password.Trim()));
            }

            GenericRepository<Recruiter> recruiterRepo = new GenericRepository<Recruiter>();
            SqlParameter[] sqlParameters = recruiterRepo.GetSqlParametersFromExpandoObject(recruiter, spName, "@");

            try
            {
                if (recruiterRepo.DoesExist(spName, sqlParameters))
                {
                    isValidRecruiter = true;
                }
                else
                {
                    isValidRecruiter = false;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return isValidRecruiter;
        }
        public static Recruiter GetRecruiterByLoginid(string loginId)
        {
            string spName = "sp_GetRecruiterByLoginid";

            try
            {
                GenericRepository<Recruiter> recruiterRepo = new GenericRepository<Recruiter>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.LoginId = loginId;
                SqlParameter[] sqlParameters = recruiterRepo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@");

                return recruiterRepo.GetOne(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static Recruiter GetRecruiterByRecruiterId(string recruiterId)
        {
            string spName = "sp_GetRecruiterByRecruiterId";

            try
            {
                GenericRepository<Recruiter> recruiterRepo = new GenericRepository<Recruiter>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.RecruiterId = recruiterId;
                SqlParameter[] sqlParameters = recruiterRepo.GetSqlParametersFromExpandoObject(expandoObject, spName, "@");

                return recruiterRepo.GetOne(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static DataTable GetAllRecruiter()
        {
            string spName = "SP_GET_All_Recruiter";
            GenericRepository<Recruiter> agencyRepo = new GenericRepository<Recruiter>();
            SqlParameter[] sqlParameters = agencyRepo.GetSqlParametersFromStoredProcedure(spName);
            DataTable recruiterDt = null;
            try
            {
                recruiterDt = agencyRepo.LoadDataTable(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return recruiterDt;
        }
        public static DataTable IsUserEmailExist(string email, int? userId)
        {
            string errorStr = String.Empty;
            string sql = "SELECT Email FROM [Users] WHERE Email=@Email";
            DataTable dt = new DataTable();
            //if (userId != null && userId.HasValue)
            //{
            //    sql += " AND UserID<>@UserId";
            //}

            //QueryParamList paramList = new QueryParamList();
            //paramList.Add(new QueryParamObj() { ParamName = "Email", ParamValue = email, DBType = DbType.String });

            //if (userId != null && userId.HasValue)
            //{
            //    paramList.Add(new QueryParamObj() { ParamName = "UserId", ParamValue = userId, DBType = DbType.Int32 });
            //}

            //DataTable dt = LoadDataTable(sql, paramList, "Users", ref errorStr);
            return dt;
        }
        public static void SaveRecruiter(Recruiter recruiter)
        {
            string spName = "sp_InsertRecruiter";

            try
            {
                GenericRepository<Recruiter> recruiterRepo = new GenericRepository<Recruiter>();
                SqlParameter[] sqlParameters = recruiterRepo.GetSqlParametersFromObject(recruiter, spName);
                recruiterRepo.Insert(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static void UpdateRecruiter(Recruiter recruiter)
        {
            string spName = "sp_UpdateRecruiter";

            try
            {
                GenericRepository<Recruiter> recruiterRepo = new GenericRepository<Recruiter>();
                SqlParameter[] sqlParameters = recruiterRepo.GetSqlParametersFromObject(recruiter, spName);
                recruiterRepo.Update(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<long> InsertRecruiterEntry(int recruiterId)
        {
            try
            {
                GenericRepository<RecruiterEntryExit> repository = new GenericRepository<RecruiterEntryExit>();
                RecruiterEntryExit recruiterEntry = new RecruiterEntryExit();
                recruiterEntry.RecruiterId = recruiterId;
                recruiterEntry.LogInTime = DateTime.Now;
                RecruiterEntryExit recruiterEntryExit = await repository.SaveAsync(recruiterEntry);
                return recruiterEntryExit.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<bool?> UpdateRecruiterEntry(int recruiterId)
        {
            try
            {
                GenericRepository<RecruiterEntryExit> repository = new GenericRepository<RecruiterEntryExit>();
                var entryExitList = await repository.GetAllAsync(e => e.RecruiterId == recruiterId && e.LogOutTime == null);
                if (entryExitList != null && entryExitList.Count() > 0)
                {
                    foreach (var entryExit in entryExitList)
                    {
                        var tempRepository = new GenericRepository<RecruiterEntryExit>();
                        entryExit.LogOutTime = DateTime.Now;
                        await tempRepository.UpdateAsync(entryExit);
                    }

                    return true;
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<bool?> UpdateRecruiterPassword(int recruiterId, string password)
        {
            try
            {
                GenericRepository<Recruiter> repository = new GenericRepository<Recruiter>();
                Recruiter recruiter = await repository.GetByIdAsync(r => r.RecruiterId == recruiterId);
                if (recruiter != null)
                {
                    recruiter.Password = password;
                    return await repository.UpdateAsync(recruiter) > 0 ? true : false;

                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static async Task<bool?> UpdateRecruiterStatus(int recruiterId, bool status)
        {
            try
            {
                GenericRepository<Recruiter> repository = new GenericRepository<Recruiter>();
                Recruiter recruiter = await repository.GetByIdAsync(r => r.RecruiterId == recruiterId);
                if (recruiter != null)
                {
                    recruiter.IsActive = status;
                    return await repository.UpdateAsync(recruiter) > 0 ? true : false;

                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static PagedResponse<EntryExitModel> GetRecruiterEntryExit(long agencyId, RecruiterHistorySearch recruiterHistorySearch)
        {
            try
            {
                IEnumerable<EntryExitModel> entryExitModels = null;

                int totalCount = 0;

                DateTime startTime;
                DateTime endTime;

                if (recruiterHistorySearch.startTime != null)
                {
                    startTime = recruiterHistorySearch.startTime.Value.AddHours(00).AddMinutes(00).AddSeconds(00);
                    endTime = recruiterHistorySearch.endTime.Value.AddHours(23).AddMinutes(59).AddSeconds(59);
                }

                else
                {
                    startTime = new DateTime(recruiterHistorySearch.endTime.Value.Year, recruiterHistorySearch.endTime.Value.Month, recruiterHistorySearch.endTime.Value.Day, 00, 00, 00);
                    endTime = recruiterHistorySearch.endTime.Value.AddHours(23).AddMinutes(59).AddSeconds(59);
                }

                GenericRepository<RecruiterEntryExit> repository = new GenericRepository<RecruiterEntryExit>();
                using (UmrrecruitmentApplicantContext context = new UmrrecruitmentApplicantContext())
                {
                    totalCount = (from recruiterEntryExit in context.RecruiterEntryExits
                                  join recruiter in context.Recruiters
                                  on recruiterEntryExit.RecruiterId equals recruiter.RecruiterId
                                  where recruiter.AgencyId == agencyId && recruiterEntryExit.LogInTime >= startTime && recruiterEntryExit.LogInTime <= endTime
                                  select recruiterEntryExit).Count();

                    entryExitModels = (from recruiterEntryExit in context.RecruiterEntryExits
                                       join recruiter in context.Recruiters
                                       on recruiterEntryExit.RecruiterId equals recruiter.RecruiterId
                                       where recruiter.AgencyId == agencyId
                                       && recruiterEntryExit.LogInTime >= startTime && recruiterEntryExit.LogInTime <= endTime
                                       orderby recruiterEntryExit.LogInTime descending
                                       select (new EntryExitModel
                                       {
                                           Id = recruiterEntryExit.Id,
                                           LogInTime = recruiterEntryExit.LogInTime.ToString("dd MMMM yyyy HH:mm:ss"),
                                           RecruiterName = recruiter.FirstName + " " + recruiter.LastName,
                                           LogOutTime = recruiterEntryExit.LogOutTime == null ? "" : recruiterEntryExit.LogOutTime.Value.ToString("dd MMMM yyyy HH:mm:ss"),
                                       })
                           ).Skip(recruiterHistorySearch.skip).Take(recruiterHistorySearch.take).ToList();

                }
                return new PagedResponse<EntryExitModel> { Records = entryExitModels, TotalRecords = totalCount };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static DataTable GetRecruiterByFilter(long agencyId, RecruiterSearchModel recruiterSearchModel)
        {
            try
            {
                //IEnumerable<RecruiterModel> recruiterModels = null;
                //int totalCount = 0;

                string sqlWithWhereClouse = "SELECT * From Recruiter where Recruiter.AgencyId = " + agencyId;

                if (!string.IsNullOrEmpty(recruiterSearchModel.FirstName))
                {
                    sqlWithWhereClouse = sqlWithWhereClouse + " AND Recruiter.FirstName like '%" + recruiterSearchModel.FirstName + "%'";
                }

                if (!string.IsNullOrEmpty(recruiterSearchModel.LastName))
                {
                    sqlWithWhereClouse = sqlWithWhereClouse + " AND Recruiter.LastName like '%" + recruiterSearchModel.LastName + "%'";
                }

                if (!string.IsNullOrEmpty(recruiterSearchModel.Email))
                {
                    sqlWithWhereClouse = sqlWithWhereClouse + "AND Recruiter.Email like '%" + recruiterSearchModel.Email + "%'";
                }
                if (!string.IsNullOrEmpty(recruiterSearchModel.Status))
                {
                    sqlWithWhereClouse = sqlWithWhereClouse + "AND Recruiter.IsActive =" + recruiterSearchModel.Status;
                }
                //var result =  context.Database.ExecuteSqlRaw(sqlWithWhereClouse);
                GenericRepository<Recruiter> genericRepository = new GenericRepository<Recruiter>();


                DataTable recruiterDt = genericRepository.LoadDataTableFromQuery(sqlWithWhereClouse, null);

                //GenericRepository<Recruiter> repository = new GenericRepository<Recruiter>();
                //using (UmrrecruitmentApplicantContext context = new UmrrecruitmentApplicantContext())
                //{


                //    if (recruiterSearchModel.Status == "")
                //    {
                //        totalCount = (from recruiter in context.Recruiters
                //                      where recruiter.AgencyId == agencyId
                //                      && recruiter.FirstName.Contains(recruiterSearchModel.FirstName)
                //                      && recruiter.LastName.Contains(recruiterSearchModel.FirstName)
                //                      && recruiter.Email.Contains(recruiterSearchModel.Eamil)
                //                      select recruiter).Count();
                //    }
                //    if (recruiterSearchModel.Status == "1")
                //    {
                //        totalCount = (from recruiter in context.Recruiters
                //                      where recruiter.AgencyId == agencyId
                //                      && recruiter.FirstName.Contains(recruiterSearchModel.FirstName)
                //                      && recruiter.LastName.Contains(recruiterSearchModel.FirstName)
                //                      && recruiter.Email.Contains(recruiterSearchModel.Eamil)
                //                      && recruiter.IsActive == true
                //                      select recruiter).Count();
                //    }
                //    if (recruiterSearchModel.Status == "0")
                //    {
                //        totalCount = (from recruiter in context.Recruiters
                //                      where recruiter.AgencyId == agencyId
                //                      && recruiter.FirstName.Contains(recruiterSearchModel.FirstName)
                //                      && recruiter.LastName.Contains(recruiterSearchModel.FirstName)
                //                      && recruiter.Email.Contains(recruiterSearchModel.Eamil)
                //                      && recruiter.IsActive == false
                //                      select recruiter).Count();
                //    }
                //    if (recruiterSearchModel.Status == "")
                //    {

                //        recruiterModels = (from recruiter in context.Recruiters
                //                           where recruiter.AgencyId == agencyId
                //                           && recruiter.FirstName.Contains(recruiterSearchModel.FirstName)
                //                           && recruiter.LastName.Contains(recruiterSearchModel.FirstName)
                //                           && recruiter.Email.Contains(recruiterSearchModel.Eamil)
                //                           select (new RecruiterModel
                //                           {
                //                               RecruiterId = recruiter.RecruiterId,
                //                               LoginId = recruiter.LoginId,
                //                               FirstName = recruiter.FirstName,
                //                               LastName = recruiter.LastName,
                //                               Email = recruiter.Email,
                //                               Telephone = recruiter.Telephone,
                //                               IsActive = recruiter.IsActive
                //                           })).ToList();
                //    }
                //    if (recruiterSearchModel.Status == "1")
                //    {
                //        recruiterModels = (from recruiter in context.Recruiters
                //                           where recruiter.AgencyId == agencyId
                //                           && recruiter.FirstName.Contains(recruiterSearchModel.FirstName)
                //                           && recruiter.LastName.Contains(recruiterSearchModel.FirstName)
                //                           && recruiter.Email.Contains(recruiterSearchModel.Eamil)
                //                           && recruiter.IsActive == true
                //                           select (new RecruiterModel
                //                           {
                //                               RecruiterId = recruiter.RecruiterId,
                //                               LoginId = recruiter.LoginId,
                //                               FirstName = recruiter.FirstName,
                //                               LastName = recruiter.LastName,
                //                               Email = recruiter.Email,
                //                               Telephone = recruiter.Telephone,
                //                               IsActive = recruiter.IsActive
                //                           })).ToList();
                //    }
                //    if (recruiterSearchModel.Status == "0")
                //    {
                //        recruiterModels = (from recruiter in context.Recruiters
                //                           where recruiter.AgencyId == agencyId
                //                           && recruiter.FirstName == recruiterSearchModel.FirstName
                //                           && recruiter.LastName == recruiterSearchModel.FirstName
                //                           && recruiter.Email == recruiterSearchModel.Eamil
                //                           && recruiter.IsActive == false
                //                           select (new RecruiterModel
                //                           {
                //                               RecruiterId = recruiter.RecruiterId,
                //                               LoginId = recruiter.LoginId,
                //                               FirstName = recruiter.FirstName,
                //                               LastName = recruiter.LastName,
                //                               Email = recruiter.Email,
                //                               Telephone = recruiter.Telephone,
                //                               IsActive = recruiter.IsActive
                //                           })).ToList();
                //    }
                //}
                return recruiterDt;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }

}
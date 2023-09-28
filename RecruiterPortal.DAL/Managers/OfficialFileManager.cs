using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortal.DAL.Managers
{
    public class OfficialFileManager
    {
        private static OfficialFile MapOfficialFileCreateRequest(OfficialFileRequest request, int recruiterId, long agencyId)
        {
            OfficialFile officialFile = new OfficialFile();
            officialFile.FileName = request.FileName;
            officialFile.FileData = request.FileData;
            officialFile.Title = request.Title;
            officialFile.IsRequired = request.IsRequired;
            officialFile.IsAdministrative = request.IsAdministrative;
            officialFile.IsActive = request.IsActive;
            officialFile.CreatedBy = recruiterId;
            officialFile.CreatedDate = DateTime.Now;
            officialFile.AgencyId = agencyId;
            return officialFile;
        }

        private static OfficialFile MapOfficialFileUpdateRequest(OfficialFileRequest request, OfficialFile officialFile, int recruiterId)
        {
            officialFile.Id = request.Id;
            officialFile.FileName = request.FileName;
            officialFile.FileData = request.FileData;
            officialFile.Title = request.Title;
            officialFile.IsRequired = request.IsRequired;
            officialFile.IsAdministrative = request.IsAdministrative;
            officialFile.IsActive = request.IsActive;
            officialFile.UpdatedBy = recruiterId;
            officialFile.UpdatedDate = DateTime.Now;
            return officialFile;
        }

        private static OfficialFileResponse MapOfficialFileResponse(OfficialFile officialFile)
        {
            OfficialFileResponse response = new OfficialFileResponse();
            response.Id = officialFile.Id;
            response.FileName = officialFile.FileName;
            response.Title = officialFile.Title;
            response.IsRequired = officialFile.IsRequired;
            response.IsAdministrative = officialFile.IsAdministrative;
            response.IsActive = officialFile.IsActive;
            response.CreatedBy = officialFile.CreatedBy;
            response.CreatedDate = officialFile.CreatedDate;
            response.UpdatedBy = officialFile.UpdatedBy;
            response.UpdatedDate = officialFile.UpdatedDate;
            return response;
        }

        private static List<OfficialFileResponse> MapOfficialFileResponse(IEnumerable<OfficialFile> officialFiles)
        {
            List<OfficialFileResponse> response = new List<OfficialFileResponse>(); 
            foreach (var officialFile in officialFiles)
            {
                response.Add(MapOfficialFileResponse(officialFile));
            }

            return response;
        }

        public static async Task<OfficialFileResponse> GetOfficialFileById(int id)
        {
            try
            {
                OfficialFileResponse response = null;
                GenericRepository<OfficialFile> repository = new GenericRepository<OfficialFile>();
                var officialFile = await repository.GetByIdAsync(m => m.Id == id);
                if (officialFile != null)
                {
                    response = MapOfficialFileResponse(officialFile);
                }

                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static async Task<List<OfficialFileResponse>> GetOfficialFileByAgencyId(long agencyId)
        {
            try
            {
                List<OfficialFileResponse> response = null;
                GenericRepository<OfficialFile> repository = new GenericRepository<OfficialFile>();
                var officialFiles = await repository.GetAllAsync(o => o.AgencyId == agencyId);
                if (officialFiles != null && officialFiles.Count() > 0)
                {
                    response = MapOfficialFileResponse(officialFiles);
                }

                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static async Task<int> Create(OfficialFileRequest request, int recruiterId, long agencyId)
        {
            try
            {
                GenericRepository<OfficialFile> repository = new GenericRepository<OfficialFile>();
                OfficialFile officialFileToCreate = MapOfficialFileCreateRequest(request, recruiterId, agencyId);
                OfficialFile createdOfficialFile = await repository.SaveAsync(officialFileToCreate);
                return createdOfficialFile.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static async Task<bool?> Update(OfficialFileRequest request, int recruiterId)
        {
            try
            {
                GenericRepository<OfficialFile> repository = new GenericRepository<OfficialFile>();
                OfficialFile officialFile = await repository.GetByIdAsync(m => m.Id == request.Id);
                if (officialFile != null)
                {
                    var officialFileToUpdate = MapOfficialFileUpdateRequest(request, officialFile, recruiterId);
                    return await repository.UpdateAsync(officialFileToUpdate) > 0 ? true : false;
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
                GenericRepository<OfficialFile> repository = new GenericRepository<OfficialFile>();
                OfficialFile officialFile = await repository.GetByIdAsync(s => s.Id == id);
                if (officialFile != null)
                {
                    return await repository.DeleteAsync(officialFile) > 0 ? true : false; ;
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

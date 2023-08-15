using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortal.DAL.Managers
{
    public class InstitutionManager
    {
        public static IEnumerable<Institution> GetInstitutions(string institutionName)
        {
            string spName = "sp_GetInstitution";
            try
            {
                GenericRepository<Institution> institutionRepo = new GenericRepository<Institution>();
                IEnumerable<Institution> institutions = institutionRepo.GetAll(spName); ;

                return institutions;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

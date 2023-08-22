using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortalDAL.Managers
{
    public class RoleManager
    {
        public static IEnumerable<Role> GetRole()
        {
            string spName = "sp_GetRole";
            try
            {
                GenericRepository<Role> roleRepo = new GenericRepository<Role>();
                IEnumerable<Role> roles = roleRepo.GetAll(spName); ;

                return roles;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

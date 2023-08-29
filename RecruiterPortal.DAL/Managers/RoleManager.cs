using Microsoft.Data.SqlClient;
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
        public static void SaveUserRole(RecruiterRole recruiterRole)
        {
            string spName = "sp_InsertRecruiterRole";

            try
            {
                GenericRepository<RecruiterRole> recruiterRoleRepo = new GenericRepository<RecruiterRole>();
                SqlParameter[] sqlParameters = recruiterRoleRepo.GetSqlParametersFromObject(recruiterRole, spName);
                recruiterRoleRepo.Insert(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

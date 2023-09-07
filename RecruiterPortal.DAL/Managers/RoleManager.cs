using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;

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

        public static DataTable GetUserRoles(Int64 p_RecruiterId)
        {
            string spName = "sp_Get_User_Roles";
            try
            {
                dynamic expandoObject = new ExpandoObject();
                expandoObject.p_RecruiterId = p_RecruiterId;
                GenericRepository<Role> roleRepo = new GenericRepository<Role>();
                SqlParameter[] sqlParameters = roleRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
                DataTable roleDataTable = null;
                try
                {
                    roleDataTable = roleRepo.LoadDataTable(spName, sqlParameters);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

                return roleDataTable;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static List<string> GetRoleNamesByRecruiterId(long recruiterId) 
        {
            List<string> roles = new List<string>();
            DataTable dtRole = GetUserRoles(recruiterId);
            if (dtRole != null && dtRole.Rows.Count > 0) 
            {
                foreach (DataRow dr in dtRole.Rows)
                {
                    roles.Add(dr["RoleKey"].ToString());
                }                
            }

            return roles;   
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

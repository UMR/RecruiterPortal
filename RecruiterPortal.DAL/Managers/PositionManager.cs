using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers
{
    public class PositionManager
    {
        public static IEnumerable<Position> GetPositions(string name)
        {
            string spName = "sp_GetPosition";
            try
            {
                GenericRepository<Position> positionRepo = new GenericRepository<Position>();
                dynamic expandoObject = new ExpandoObject();
                expandoObject.PositionName = name;
                SqlParameter[] sqlParameters = positionRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
                IEnumerable<Position> positionList = positionRepo.GetAll(spName, sqlParameters); 

                return positionList;
            }
            catch (Exception ex)
            {
                throw  new Exception(ex.Message);
            }
        }
    }
}

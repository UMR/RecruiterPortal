using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;

namespace RecruiterPortalDAL.Managers
{
    public class RaceManager
    {
        public static IEnumerable<Race> GetRace()
        {
            string spName = "sp_GetRace";
            try
            {
                GenericRepository<Race> view_Race_Repo = new GenericRepository<Race>();
                IEnumerable<Race> view_Race_List = view_Race_Repo.GetAll(spName); ;

                return view_Race_List;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

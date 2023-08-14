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
                GenericRepository<Race> raceRepo = new GenericRepository<Race>();
                IEnumerable<Race> races = raceRepo.GetAll(spName); ;

                return races;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

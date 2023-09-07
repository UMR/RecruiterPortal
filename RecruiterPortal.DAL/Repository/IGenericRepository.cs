using Microsoft.Data.SqlClient;
using System.Dynamic;
using System.Linq.Expressions;

namespace RecruiterPortal.DAL.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        IEnumerable<T> GetAll(string storedProcedureName, SqlParameter[] parameters = null);
        T GetOne(string storedProcedureName, SqlParameter[] parameters = null);
        List<SqlParameter> Insert(string storedProcedureName, SqlParameter[] parameters = null);
        int Update(string storedProcedureName, SqlParameter[] parameters = null);
        int Delete(string storedProcedureName, SqlParameter[] parameters = null);
        void Save(string storedProcedureName, SqlParameter[] parameters = null);
        Task<T> SaveAsync(T entity);
        Task<int> UpdateAsync(T entity);
        Task<int> DeleteAsync(T entity);
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate);
        Task<T> GetByIdAsync(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> GetPageAsync(Expression<Func<T, bool>> predicate, int page, int pageSize);
        bool DoesExist(string storedProcedureName, SqlParameter[] parameters = null);
        SqlParameter[] GetSqlParametersFromObject(T obj, string spName, string preFix = "@");
        SqlParameter[] GetSqlParametersFromExpandoObject(ExpandoObject obj, string spName, string preFix = "@");

    }
}
 
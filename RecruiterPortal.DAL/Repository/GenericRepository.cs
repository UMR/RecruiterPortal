using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;
using System.Linq.Expressions;

namespace RecruiterPortal.DAL.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private Repository<T> _repo = null;

        public GenericRepository()
        {
            _repo = new Repository<T>(new UmrrecruitmentApplicantContext());
        }

        public IEnumerable<T> GetAll(string storedProcedureName, SqlParameter[] parameters = null)
        {
            return _repo.StoredProcedure(storedProcedureName, parameters);
        }

        public T GetOne(string storedProcedureName, SqlParameter[] parameters = null)
        {
            return _repo.StoredProcedure(storedProcedureName, parameters).SingleOrDefault();
        }

        public List<SqlParameter> Insert(string storedProcedureName, SqlParameter[] parameters = null)
        {
            return _repo.NonQueryStoredProcedure(storedProcedureName, parameters);
        }

        public int Update(string storedProcedureName, SqlParameter[] parameters = null)
        {
            return _repo.NonQueryStoredProcedureRowCount(storedProcedureName, parameters);
        }

        public int Delete(string storedProcedureName, SqlParameter[] parameters = null)
        {
            return _repo.NonQueryStoredProcedureRowCount(storedProcedureName, parameters);
        }

        public void Save(string storedProcedureName, SqlParameter[] parameters = null)
        {
            _repo.StoredProcedure(storedProcedureName, parameters);
        }

        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate)
        {
            return await _repo.GetAllAsync(predicate);
        }
        public async Task<int> GetAllAsyncCount(Expression<Func<T, bool>> predicate)
        {
            return await _repo.GetAllAsyncCount(predicate);
        }
        public async Task<int> GetAllAsyncCount()
        {
            return await _repo.GetAllAsyncCount();
        }

        public async Task<IEnumerable<T>> GetPageAsync(Expression<Func<T, bool>> predicate, int page, int pageSize)
        {
            return await _repo.GetPageAsync(predicate, page, pageSize);
        }

        public async Task<T> GetByIdAsync(Expression<Func<T, bool>> predicate)
        {
            return await _repo.GetByIdAsync(predicate);
        }

        public async Task<T> SaveAsync(T entity)
        {
            return await _repo.SaveAsync(entity);
        }

        public async Task<int> UpdateAsync(T entity)
        {
            return await _repo.UpdateAsync(entity);
        }

        public async Task<int> DeleteAsync(T entity)
        {
            return await _repo.DeleteAsync(entity);
        }

        public bool DoesExist(string storedProcedureName, SqlParameter[] parameters = null)
        {
            return _repo.StoredProcedure(storedProcedureName, parameters).Any();
        }

        public DataTable LoadDataTable(string storedProcedureName, SqlParameter[] parameters = null)
        {
            return _repo.LoadDataSetStoredProcedure(storedProcedureName, parameters);
        }
        public DataSet LoadDataSetTable(string storedProcedureName, SqlParameter[] parameters = null)
        {
            return _repo.LoadDataStoredProcedure(storedProcedureName, parameters);
        }
        public SqlParameter[] GetSqlParametersFromObject(T obj, string spName, string preFix = "@")
        {
            List<SqlParameter> parameters = _repo.StoredProcedureParams(spName).ToList<SqlParameter>();

            var tableType = typeof(T);
            var result = tableType.GetProperties().ToList();

            foreach (var sqlParameter in parameters)
            {
                sqlParameter.Value = DBNull.Value;
                foreach (var item in result)
                {
                    if (preFix + item.Name.ToLower() == sqlParameter.ParameterName.ToLower())
                    {
                        if (item.GetValue(obj) == null)
                        {
                            sqlParameter.Value = DBNull.Value;
                        }
                        else
                        {
                            sqlParameter.Value = item.GetValue(obj);
                        }
                    }
                }
            }

            return parameters.ToArray();
        }

        public SqlParameter[] GetSqlParametersFromObject(ExpandoObject endoObj, T obj, string spName, string preFix = "@")
        {
            List<SqlParameter> parameters = _repo.StoredProcedureParams(spName).ToList<SqlParameter>();

            var tableType = typeof(T);
            var result = tableType.GetProperties().ToList();

            IDictionary<string, object> propertyValues = endoObj;

            foreach (var sqlParameter in parameters)
            {
                sqlParameter.Value = DBNull.Value;
                foreach (var item in result)
                {
                    if (preFix + item.Name.ToLower() == sqlParameter.ParameterName.ToLower())
                    {
                        if (item.GetValue(obj) == null)
                        {
                            sqlParameter.Value = DBNull.Value;
                        }
                        else
                        {
                            sqlParameter.Value = item.GetValue(obj);
                        }
                    }
                }

                foreach (var item in propertyValues)
                {
                    if (preFix + item.Key.ToLower() == sqlParameter.ParameterName.ToLower())
                    {
                        if (item.Value == null)
                        {
                            sqlParameter.Value = DBNull.Value;
                        }
                        else
                        {
                            sqlParameter.Value = item.Value;
                        }
                    }
                }
            }

            return parameters.ToArray();
        }

        public SqlParameter[] GetSqlParametersFromExpandoObject(ExpandoObject obj, string spName, string preFix = "@")
        {
            List<SqlParameter> parameters = _repo.StoredProcedureParams(spName).ToList<SqlParameter>();

            IDictionary<string, object> propertyValues = obj;

            foreach (var sqlParameter in parameters)
            {
                sqlParameter.Value = DBNull.Value;
                foreach (var item in propertyValues)
                {
                    if (preFix + item.Key.ToLower() == sqlParameter.ParameterName.ToLower())
                    {
                        if (item.Value == null)
                        {
                            sqlParameter.Value = DBNull.Value;
                        }
                        else
                        {
                            sqlParameter.Value = item.Value;
                        }
                    }
                }
            }

            return parameters.ToArray();
        }


        public SqlParameter[] GetSqlParametersFromParamArray(string spName, string preFix = "", params object[] paramList)
        {
            List<SqlParameter> parameters = _repo.StoredProcedureParams(spName).ToList<SqlParameter>();

            foreach (var sqlParameter in parameters)
            {
                foreach (var item in paramList)
                {
                    if (preFix + nameof(item) == sqlParameter.ParameterName)
                    {
                        sqlParameter.Value = item;
                    }
                }
            }

            return parameters.ToArray();
        }

        public SqlParameter[] GetSqlParametersFromStoredProcedure(string spName)
        {
            return _repo.StoredProcedureParams(spName);
        }
    }
}

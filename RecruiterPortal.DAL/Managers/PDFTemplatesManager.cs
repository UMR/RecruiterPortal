using Microsoft.Data.SqlClient;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Data;
using System.Dynamic;

namespace RecruiterPortalDAL.Managers
{
    public class PDFTemplatesManager
    {
        public static DataTable GetPDFTemplatesFileType(string fileTypeCode)
        {
            string spName = "sp_GetPDFFileTemplateFileType";
            dynamic expandoObject = new ExpandoObject();
            expandoObject.FileTypeCode = fileTypeCode;
            GenericRepository<Pdftemplate> userRepo = new GenericRepository<Pdftemplate>();
            SqlParameter[] sqlParameters = userRepo.GetSqlParametersFromExpandoObject(expandoObject, spName);
            DataTable pdfTemplate = null;
            try
            {
                pdfTemplate = userRepo.LoadDataTable(spName, sqlParameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return pdfTemplate;

            //return new DataTable();
        }
    }
}

USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllApplicantByFilter]    Script Date: 9/19/2023 4:47:57 PM ******/

CREATE PROCEDURE [dbo].[sp_GetAllInstitutionByFilter] 
	@Take INT = NULL,
	@Skip INT = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SELECT COUNT(Ins.Id) AS RowNumber FROM [UMRRecruitmentApplicant].[dbo].[Institution] As Ins
    -- Select for data row count

SELECT Ins.*,ST.StateName FROM [UMRRecruitmentApplicant].[dbo].[Institution] As Ins INNER JOIN [State] AS ST ON ST.StateId=Ins.StateId 
  ORDER BY Ins.CreatedDate,InstituteName
  OFFSET @Skip ROWS FETCH NEXT @Take ROWS ONLY
  
END
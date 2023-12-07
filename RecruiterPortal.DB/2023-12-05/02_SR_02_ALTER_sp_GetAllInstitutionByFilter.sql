USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllInstitutionByFilter]    Script Date: 12/7/2023 6:31:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllApplicantByFilter]    Script Date: 9/19/2023 4:47:57 PM ******/

ALTER PROCEDURE [dbo].[sp_GetAllInstitutionByFilter] 
	@Take INT = NULL,
	@Skip INT = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SELECT COUNT(Ins.Id) AS RowNumber FROM [UMRRecruitmentApplicant].[dbo].[Institution] As Ins WHERE Ins.StateId IS NOT NULL
    -- Select for data row count

SELECT Ins.*,ST.StateName FROM [UMRRecruitmentApplicant].[dbo].[Institution] As Ins INNER JOIN [State] AS ST ON ST.StateId=Ins.StateId 
  ORDER BY Ins.CreatedDate,InstituteName
  OFFSET @Skip ROWS FETCH NEXT @Take ROWS ONLY
  
END
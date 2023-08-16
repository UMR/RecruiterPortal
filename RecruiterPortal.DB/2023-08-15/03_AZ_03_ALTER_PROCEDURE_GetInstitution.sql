USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetInstitution]    Script Date: 8/16/2023 12:54:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetInstitution] 
@Name VARCHAR(250) NULL
AS
BEGIN	

	IF(@Name IS NOT NULL)
		SELECT * FROM [dbo].[Institution] WHERE InstituteName LIKE  @Name + '%' ORDER BY InstituteName;
	ELSE
	SELECT TOP(100) * FROM [dbo].[Institution] ORDER BY InstituteName

END


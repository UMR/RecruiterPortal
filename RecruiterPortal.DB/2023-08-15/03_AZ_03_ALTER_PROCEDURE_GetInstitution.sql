USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetInstitution]    Script Date: 8/15/2023 7:29:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetInstitution] 
AS
BEGIN	

	SELECT * FROM [dbo].[Institution] ORDER BY InstituteName

END


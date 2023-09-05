USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetIssueingAuthorityByText]    Script Date: 9/5/2023 12:49:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_GetIssueingAuthorityByText] 	
	@IssueAuthority nvarchar(100) = 'AllIssueAuthority'
AS
BEGIN		
	SET NOCOUNT ON;
	
	IF (@IssueAuthority IS NOT NULL AND @IssueAuthority <> 'AllIssueAuthority')
		SELECT TOP 10 * FROM View_IssueAuthority WHERE IssueAuthority LIKE ''+@IssueAuthority+'%'

	IF (@IssueAuthority IS NOT NULL AND @IssueAuthority = 'AllIssueAuthority')
		SELECT TOP 100 * FROM View_IssueAuthority ORDER BY IssueAuthority

END
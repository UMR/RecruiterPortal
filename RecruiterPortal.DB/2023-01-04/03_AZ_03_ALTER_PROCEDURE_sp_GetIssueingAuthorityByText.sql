USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetIssueingAuthorityByText]    Script Date: 1/5/2023 12:54:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sp_GetIssueingAuthorityByText] 
	-- Add the parameters for the stored procedure here
	@IssueAuthority nvarchar(100) = 'AllIssueAuthority'
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF (@IssueAuthority IS NOT NULL AND @IssueAuthority <> 'AllIssueAuthority')
		SELECT TOP 10 * FROM View_IssueAuthority WHERE IssueAuthority LIKE ''+@IssueAuthority+'%'

	IF (@IssueAuthority IS NOT NULL AND @IssueAuthority = 'AllIssueAuthority')
		SELECT * FROM View_IssueAuthority ORDER BY IssueAuthority

END
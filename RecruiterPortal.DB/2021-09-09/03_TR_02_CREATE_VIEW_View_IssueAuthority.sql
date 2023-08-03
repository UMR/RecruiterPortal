IF OBJECT_ID ('dbo.View_IssueAuthority') IS NOT NULL
	DROP VIEW dbo.View_IssueAuthority
GO

CREATE VIEW dbo.View_IssueAuthority
AS
SELECT        UMRRecruitementDB_New.dbo.View_IssueAuthority.*
FROM            UMRRecruitementDB_New.dbo.View_IssueAuthority

GO

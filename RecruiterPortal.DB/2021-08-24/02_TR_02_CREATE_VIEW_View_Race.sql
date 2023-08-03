USE [UMRRecruitmentApplicant]
GO

IF OBJECT_ID ('dbo.View_Race') IS NOT NULL
	DROP VIEW dbo.View_Race
GO

CREATE VIEW dbo.View_Race
AS
SELECT Race
FROM UMRRecruitementDB_New.dbo.Race

GO

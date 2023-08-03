USE [UMRRecruitmentApplicant]
GO

ALTER TABLE dbo.UserPhysical
ALTER COLUMN Height nvarchar(200)
GO

ALTER TABLE dbo.UserPhysical
ALTER COLUMN Race nvarchar(200)
GO


ALTER TABLE dbo.UserPhysical
ALTER COLUMN Weight nvarchar(200)
GO

ALTER TABLE dbo.UserPhysical
ALTER COLUMN HairColor nvarchar(200)
GO
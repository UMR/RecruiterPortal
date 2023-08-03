USE [UMRRecruitmentApplicant]
GO
ALTER TABLE dbo.UserDetails
ADD DateOfBirth datetime
GO
ALTER TABLE dbo.UserDetails
ADD Gender nvarchar(20)
GO

ALTER TABLE dbo.UserDetails
ADD CountryOfBirth nvarchar(50)
GO
ALTER TABLE dbo.UserDetails
ADD CountryFromApplied nvarchar(50)
GO
USE [UMRRecruitmentApplicant]
GO

ALTER TABLE dbo.UserLicense
	ADD FileType tinyint NULL,
	FIleData VARBINARY(MAX) NULL,
	FileName NVARCHAR(512) NULL,
	IssuedDate DATETIME NULL

ALTER TABLE dbo.UserLicense
DROP COLUMN FileType

ALTER TABLE dbo.UserLicense
	ADD FileType tinyint NULL
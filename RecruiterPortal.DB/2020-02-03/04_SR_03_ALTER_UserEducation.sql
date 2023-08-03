/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.UserEducation
	DROP CONSTRAINT FK_UserEducation_User
GO
ALTER TABLE dbo.[User] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.[User]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.UserEducation
	DROP CONSTRAINT DF__UserEduca__Creat__69FBBC1F
GO
CREATE TABLE dbo.Tmp_UserEducation
	(
	UserEducationID bigint NOT NULL IDENTITY (1, 1),
	SchoolName nvarchar(500) NOT NULL,
	SchoolAddress nvarchar(500) NULL,
	Degree nvarchar(200) NOT NULL,
	FromDate int NULL,
	ToDate int NULL,
	IsGraduate bit NOT NULL,
	UserID bigint NOT NULL,
	CreatedDate datetime NULL,
	InstitutionType tinyint NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_UserEducation SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_UserEducation ADD CONSTRAINT
	DF__UserEduca__Creat__69FBBC1F DEFAULT (getdate()) FOR CreatedDate
GO
SET IDENTITY_INSERT dbo.Tmp_UserEducation ON
GO
IF EXISTS(SELECT * FROM dbo.UserEducation)
	 EXEC('INSERT INTO dbo.Tmp_UserEducation (UserEducationID, SchoolName, SchoolAddress, Degree, FromDate, ToDate, IsGraduate, UserID, CreatedDate, InstitutionType)
		SELECT UserEducationID, SchoolName, SchoolAddress, Degree, CONVERT(int, FromDate), CONVERT(int, ToDate), IsGraduate, UserID, CreatedDate, InstitutionType FROM dbo.UserEducation WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_UserEducation OFF
GO
DROP TABLE dbo.UserEducation
GO
EXECUTE sp_rename N'dbo.Tmp_UserEducation', N'UserEducation', 'OBJECT' 
GO
ALTER TABLE dbo.UserEducation ADD CONSTRAINT
	PK_UserEducation PRIMARY KEY CLUSTERED 
	(
	UserEducationID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.UserEducation ADD CONSTRAINT
	FK_UserEducation_User FOREIGN KEY
	(
	UserID
	) REFERENCES dbo.[User]
	(
	UserID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT
select Has_Perms_By_Name(N'dbo.UserEducation', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserEducation', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserEducation', 'Object', 'CONTROL') as Contr_Per
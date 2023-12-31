/*
   Monday, November 18, 20198:33:32 PM
   User: sa
   Server: LAPTOP-O69TNBVB
   Database: UMRRecruitmentApplicant
   Application: 
*/

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
ALTER TABLE dbo.UserCompany
	DROP CONSTRAINT FK_UseCompany_User
GO
ALTER TABLE dbo.[User] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.[User]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
CREATE TABLE dbo.Tmp_UserCompany
	(
	UseCompanyID bigint NOT NULL IDENTITY (1, 1),
	CompanyName nvarchar(500) NOT NULL,
	EMInstituteID bigint NULL,
	CompanyAddress nvarchar(500) NOT NULL,
	Supervisor nvarchar(250) NOT NULL,
	CompanyPhone nvarchar(50) NOT NULL,
	JobTItle nvarchar(500) NOT NULL,
	EMPositionID bigint NULL,
	StartingSalary nvarchar(200) NOT NULL,
	EndingSalary nvarchar(200) NOT NULL,
	FromDate datetime NOT NULL,
	ToDate datetime NULL,
	UserID bigint NOT NULL,
	CanContactThisEmployer bit NOT NULL,
	LeaveReason nvarchar(500) NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_UserCompany SET (LOCK_ESCALATION = TABLE)
GO
SET IDENTITY_INSERT dbo.Tmp_UserCompany ON
GO
IF EXISTS(SELECT * FROM dbo.UserCompany)
	 EXEC('INSERT INTO dbo.Tmp_UserCompany (UseCompanyID, CompanyName, EMInstituteID, CompanyAddress, Supervisor, CompanyPhone, JobTItle, EMPositionID, StartingSalary, EndingSalary, FromDate, ToDate, UserID, CanContactThisEmployer, LeaveReason)
		SELECT UseCompanyID, CompanyName, EMInstituteID, CompanyAddress, Supervisor, CompanyPhone, JobTItle, EMPositionID, StartingSalary, EndingSalary, FromDate, ToDate, UserID, CanContactThisEmployer, LeaveReason FROM dbo.UserCompany WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_UserCompany OFF
GO
DROP TABLE dbo.UserCompany
GO
EXECUTE sp_rename N'dbo.Tmp_UserCompany', N'UserCompany', 'OBJECT' 
GO
ALTER TABLE dbo.UserCompany ADD CONSTRAINT
	PK_UseCompany PRIMARY KEY CLUSTERED 
	(
	UseCompanyID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.UserCompany ADD CONSTRAINT
	FK_UseCompany_User FOREIGN KEY
	(
	UserID
	) REFERENCES dbo.[User]
	(
	UserID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT
select Has_Perms_By_Name(N'dbo.UserCompany', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserCompany', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserCompany', 'Object', 'CONTROL') as Contr_Per 
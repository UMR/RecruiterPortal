/*
   Monday, November 18, 20198:34:38 PM
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
ALTER TABLE dbo.UserDetails
	DROP CONSTRAINT FK_UserDetails_User
GO
ALTER TABLE dbo.[User] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.[User]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.UserDetails
	DROP CONSTRAINT DF__UserDetai__Creat__6166761E
GO
CREATE TABLE dbo.Tmp_UserDetails
	(
	UserDetailsID bigint NOT NULL IDENTITY (1, 1),
	StreetAddress nvarchar(500) NOT NULL,
	Apt nvarchar(50) NOT NULL,
	ZipCode nvarchar(50) NOT NULL,
	Phone nvarchar(50) NOT NULL,
	SSN nvarchar(10) NOT NULL,
	DateAvailable datetime NOT NULL,
	DesiredSalary nvarchar(200) NOT NULL,
	DesiredPositionId int NOT NULL,
	IsUSCitizen bit NOT NULL,
	IsAuthorized bit NOT NULL,
	IsOldClient bit NOT NULL,
	IsConvict bit NOT NULL,
	ConvictionDetail nvarchar(500) NULL,
	UserID bigint NOT NULL,
	CreatedDate datetime NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_UserDetails SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_UserDetails ADD CONSTRAINT
	DF__UserDetai__Creat__6166761E DEFAULT (getdate()) FOR CreatedDate
GO
SET IDENTITY_INSERT dbo.Tmp_UserDetails ON
GO
IF EXISTS(SELECT * FROM dbo.UserDetails)
	 EXEC('INSERT INTO dbo.Tmp_UserDetails (UserDetailsID, StreetAddress, Apt, ZipCode, Phone, SSN, DateAvailable, DesiredSalary, DesiredPositionId, IsUSCitizen, IsAuthorized, IsOldClient, IsConvict, ConvictionDetail, UserID, CreatedDate)
		SELECT UserDetailsID, StreetAddress, Apt, ZipCode, Phone, SSN, DateAvailable, DesiredSalary, DesiredPositionId, IsUSCitizen, IsAuthorized, IsOldClient, IsConvict, ConvictionDetail, UserID, CreatedDate FROM dbo.UserDetails WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_UserDetails OFF
GO
DROP TABLE dbo.UserDetails
GO
EXECUTE sp_rename N'dbo.Tmp_UserDetails', N'UserDetails', 'OBJECT' 
GO
ALTER TABLE dbo.UserDetails ADD CONSTRAINT
	PK_UserDetails PRIMARY KEY CLUSTERED 
	(
	UserDetailsID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.UserDetails ADD CONSTRAINT
	FK_UserDetails_User FOREIGN KEY
	(
	UserID
	) REFERENCES dbo.[User]
	(
	UserID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT
select Has_Perms_By_Name(N'dbo.UserDetails', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserDetails', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserDetails', 'Object', 'CONTROL') as Contr_Per 
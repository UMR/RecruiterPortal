/*
   Monday, November 18, 20198:13:04 PM
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
ALTER TABLE dbo.UserEmergencyInfo
	DROP CONSTRAINT FK_UserEmergencyInfo_User
GO
ALTER TABLE dbo.[User] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.[User]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.UserEmergencyInfo
	DROP CONSTRAINT DF__UserEmerg__Creat__634EBE90
GO
CREATE TABLE dbo.Tmp_UserEmergencyInfo
	(
	UserEmergencyInfoID bigint NOT NULL IDENTITY (1, 1),
	EmrLastName nvarchar(30) NOT NULL,
	EmrFirstName nvarchar(30) NOT NULL,
	NatureOfRelationship nvarchar(50) NULL,
	EmrCellPhone nvarchar(50) NULL,
	EmrHomePhone nvarchar(50) NOT NULL,
	EmrType tinyint NOT NULL,
	UserID bigint NOT NULL,
	CreatedDate datetime NULL,
	EmrWorkPhone varchar(50) NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_UserEmergencyInfo SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_UserEmergencyInfo ADD CONSTRAINT
	DF__UserEmerg__Creat__634EBE90 DEFAULT (getdate()) FOR CreatedDate
GO
SET IDENTITY_INSERT dbo.Tmp_UserEmergencyInfo ON
GO
IF EXISTS(SELECT * FROM dbo.UserEmergencyInfo)
	 EXEC('INSERT INTO dbo.Tmp_UserEmergencyInfo (UserEmergencyInfoID, EmrLastName, EmrFirstName, NatureOfRelationship, EmrCellPhone, EmrHomePhone, EmrType, UserID, CreatedDate, EmrWorkPhone)
		SELECT UserEmergencyInfoID, EmrLastName, EmrFirstName, NatureOfRelationship, EmrCellPhone, EmrHomePhone, EmrType, UserID, CreatedDate, EmrWorkPhone FROM dbo.UserEmergencyInfo WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_UserEmergencyInfo OFF
GO
DROP TABLE dbo.UserEmergencyInfo
GO
EXECUTE sp_rename N'dbo.Tmp_UserEmergencyInfo', N'UserEmergencyInfo', 'OBJECT' 
GO
ALTER TABLE dbo.UserEmergencyInfo ADD CONSTRAINT
	PK_UserEmergencyInfo PRIMARY KEY CLUSTERED 
	(
	UserEmergencyInfoID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.UserEmergencyInfo ADD CONSTRAINT
	FK_UserEmergencyInfo_User FOREIGN KEY
	(
	UserID
	) REFERENCES dbo.[User]
	(
	UserID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT
select Has_Perms_By_Name(N'dbo.UserEmergencyInfo', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserEmergencyInfo', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserEmergencyInfo', 'Object', 'CONTROL') as Contr_Per 
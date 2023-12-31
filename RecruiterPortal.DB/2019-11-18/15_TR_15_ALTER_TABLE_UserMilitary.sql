/*
   Monday, November 18, 20198:35:43 PM
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
ALTER TABLE dbo.UserMilitary
	DROP CONSTRAINT FK_UserMilitary_User
GO
ALTER TABLE dbo.[User] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.[User]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.UserMilitary
	DROP CONSTRAINT DF__UserMilit__Creat__65370702
GO
CREATE TABLE dbo.Tmp_UserMilitary
	(
	UserMilitaryID bigint NOT NULL IDENTITY (1, 1),
	Branch nvarchar(500) NOT NULL,
	FromDate datetime NOT NULL,
	ToDate datetime NULL,
	RankAtDischarge nvarchar(150) NOT NULL,
	TypeOfDischarge bit NOT NULL,
	DisonourComment nvarchar(500) NULL,
	UserID bigint NOT NULL,
	CreatedDate datetime NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_UserMilitary SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_UserMilitary ADD CONSTRAINT
	DF__UserMilit__Creat__65370702 DEFAULT (getdate()) FOR CreatedDate
GO
SET IDENTITY_INSERT dbo.Tmp_UserMilitary ON
GO
IF EXISTS(SELECT * FROM dbo.UserMilitary)
	 EXEC('INSERT INTO dbo.Tmp_UserMilitary (UserMilitaryID, Branch, FromDate, ToDate, RankAtDischarge, TypeOfDischarge, DisonourComment, UserID, CreatedDate)
		SELECT UserMilitaryID, Branch, FromDate, ToDate, RankAtDischarge, TypeOfDischarge, DisonourComment, UserID, CreatedDate FROM dbo.UserMilitary WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_UserMilitary OFF
GO
DROP TABLE dbo.UserMilitary
GO
EXECUTE sp_rename N'dbo.Tmp_UserMilitary', N'UserMilitary', 'OBJECT' 
GO
ALTER TABLE dbo.UserMilitary ADD CONSTRAINT
	PK_UserMilitary PRIMARY KEY CLUSTERED 
	(
	UserMilitaryID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.UserMilitary ADD CONSTRAINT
	FK_UserMilitary_User FOREIGN KEY
	(
	UserID
	) REFERENCES dbo.[User]
	(
	UserID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT
select Has_Perms_By_Name(N'dbo.UserMilitary', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserMilitary', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserMilitary', 'Object', 'CONTROL') as Contr_Per 
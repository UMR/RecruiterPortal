USE [UMRRecruitmentApplicant]
GO
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
ALTER TABLE dbo.[User] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.[User]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
CREATE TABLE dbo.ChangeTracker
	(
	ChangeTrackerID bigint NOT NULL IDENTITY (1, 1),
	HasNewChanges bit NOT NULL,
	ChangeDate datetime NULL,
	ImportDate datetime NULL,
	UserID bigint NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.ChangeTracker ADD CONSTRAINT
	PK_ChangeTracker PRIMARY KEY CLUSTERED 
	(
	ChangeTrackerID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.ChangeTracker ADD CONSTRAINT
	FK_ChangeTracker_User1 FOREIGN KEY
	(
	UserID
	) REFERENCES dbo.[User]
	(
	UserID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.ChangeTracker SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.ChangeTracker', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.ChangeTracker', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.ChangeTracker', 'Object', 'CONTROL') as Contr_Per 
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
ALTER TABLE dbo.UserVerification
	DROP CONSTRAINT FK_UserVerification_User
GO
ALTER TABLE dbo.[User] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.[User]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
CREATE TABLE dbo.Tmp_UserVerification
	(
	UserVerificationID bigint NOT NULL IDENTITY (1, 1),
	UserID bigint NOT NULL,
	CreatedDate datetime NOT NULL,
	ExpiryDate datetime NOT NULL,
	Active bit NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_UserVerification SET (LOCK_ESCALATION = TABLE)
GO
SET IDENTITY_INSERT dbo.Tmp_UserVerification ON
GO
IF EXISTS(SELECT * FROM dbo.UserVerification)
	 EXEC('INSERT INTO dbo.Tmp_UserVerification (UserVerificationID, UserID, CreatedDate, ExpiryDate, Active)
		SELECT UserVerificationID, UserID, CreatedDate, ExpiryDate, Active FROM dbo.UserVerification WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_UserVerification OFF
GO
DROP TABLE dbo.UserVerification
GO
EXECUTE sp_rename N'dbo.Tmp_UserVerification', N'UserVerification', 'OBJECT' 
GO
ALTER TABLE dbo.UserVerification ADD CONSTRAINT
	PK_UserVerification PRIMARY KEY CLUSTERED 
	(
	UserVerificationID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.UserVerification ADD CONSTRAINT
	FK_UserVerification_User FOREIGN KEY
	(
	UserID
	) REFERENCES dbo.[User]
	(
	UserID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT
select Has_Perms_By_Name(N'dbo.UserVerification', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserVerification', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserVerification', 'Object', 'CONTROL') as Contr_Per 
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
ALTER TABLE dbo.[User]
	DROP CONSTRAINT DF__User__IsVerified__4E88ABD4
GO
CREATE TABLE dbo.Tmp_User
	(
	UserID bigint NOT NULL IDENTITY (1, 1),
	First_Name nvarchar(30) NOT NULL,
	Last_Name nvarchar(30) NOT NULL,
	Email nvarchar(200) NOT NULL,
	Password nvarchar(500) NOT NULL,
	Middle_Name nvarchar(200) NULL,
	IsVerified bit NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_User SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_User ADD CONSTRAINT
	DF__User__IsVerified__4E88ABD4 DEFAULT ((1)) FOR IsVerified
GO
SET IDENTITY_INSERT dbo.Tmp_User ON
GO
IF EXISTS(SELECT * FROM dbo.[User])
	 EXEC('INSERT INTO dbo.Tmp_User (UserID, First_Name, Last_Name, Email, Password, Middle_Name, IsVerified)
		SELECT UserID, First_Name, Last_Name, Email, Password, Middle_Name, IsVerified FROM dbo.[User] WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_User OFF
GO
ALTER TABLE dbo.UserVerification
	DROP CONSTRAINT FK_UserVerification_User
GO
ALTER TABLE dbo.UserFile
	DROP CONSTRAINT FK_UserFiles_User
GO
ALTER TABLE dbo.UserRecruiterComment
	DROP CONSTRAINT FK_UserRecruiterComment_User
GO
DROP TABLE dbo.[User]
GO
EXECUTE sp_rename N'dbo.Tmp_User', N'User', 'OBJECT' 
GO
ALTER TABLE dbo.[User] ADD CONSTRAINT
	PK_User PRIMARY KEY CLUSTERED 
	(
	UserID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
COMMIT
select Has_Perms_By_Name(N'dbo.[User]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.UserRecruiterComment ADD CONSTRAINT
	FK_UserRecruiterComment_User FOREIGN KEY
	(
	UserID
	) REFERENCES dbo.[User]
	(
	UserID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.UserRecruiterComment SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.UserRecruiterComment', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserRecruiterComment', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserRecruiterComment', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.UserFile ADD CONSTRAINT
	FK_UserFiles_User FOREIGN KEY
	(
	UserID
	) REFERENCES dbo.[User]
	(
	UserID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.UserFile SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.UserFile', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserFile', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserFile', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
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
ALTER TABLE dbo.UserVerification SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.UserVerification', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserVerification', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserVerification', 'Object', 'CONTROL') as Contr_Per 
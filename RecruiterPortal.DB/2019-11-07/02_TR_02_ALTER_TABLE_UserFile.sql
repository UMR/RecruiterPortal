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
ALTER TABLE dbo.UserFile
	DROP CONSTRAINT FK_UserFiles_User
GO
ALTER TABLE dbo.[User] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.[User]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
CREATE TABLE dbo.Tmp_UserFile
	(
	UserFileID bigint NOT NULL IDENTITY (1, 1),
	FIleData varbinary(MAX) NOT NULL,
	FileName nvarchar(MAX) NOT NULL,
	CreatedDate datetime NOT NULL,
	UserID bigint NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_UserFile SET (LOCK_ESCALATION = TABLE)
GO
SET IDENTITY_INSERT dbo.Tmp_UserFile ON
GO
IF EXISTS(SELECT * FROM dbo.UserFile)
	 EXEC('INSERT INTO dbo.Tmp_UserFile (UserFileID, FIleData, FileName, CreatedDate, UserID)
		SELECT UserFileID, FIleData, FileName, CreatedDate, UserID FROM dbo.UserFile WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_UserFile OFF
GO
DROP TABLE dbo.UserFile
GO
EXECUTE sp_rename N'dbo.Tmp_UserFile', N'UserFile', 'OBJECT' 
GO
ALTER TABLE dbo.UserFile ADD CONSTRAINT
	PK_UserFiles PRIMARY KEY CLUSTERED 
	(
	UserFileID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

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
COMMIT
select Has_Perms_By_Name(N'dbo.UserFile', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserFile', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserFile', 'Object', 'CONTROL') as Contr_Per 
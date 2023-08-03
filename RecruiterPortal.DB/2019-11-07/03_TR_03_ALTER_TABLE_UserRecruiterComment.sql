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
ALTER TABLE dbo.UserRecruiterComment
	DROP CONSTRAINT FK_UserRecruiterComment_User
GO
ALTER TABLE dbo.[User] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.[User]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
CREATE TABLE dbo.Tmp_UserRecruiterComment
	(
	UserRecruiterCommentID bigint NOT NULL IDENTITY (1, 1),
	Comment nvarchar(MAX) NOT NULL,
	CommentDate datetime NOT NULL,
	UserID bigint NOT NULL,
	RecruiterName nvarchar(MAX) NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_UserRecruiterComment SET (LOCK_ESCALATION = TABLE)
GO
SET IDENTITY_INSERT dbo.Tmp_UserRecruiterComment ON
GO
IF EXISTS(SELECT * FROM dbo.UserRecruiterComment)
	 EXEC('INSERT INTO dbo.Tmp_UserRecruiterComment (UserRecruiterCommentID, Comment, CommentDate, UserID, RecruiterName)
		SELECT UserRecruiterCommentID, Comment, CommentDate, UserID, RecruiterName FROM dbo.UserRecruiterComment WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_UserRecruiterComment OFF
GO
DROP TABLE dbo.UserRecruiterComment
GO
EXECUTE sp_rename N'dbo.Tmp_UserRecruiterComment', N'UserRecruiterComment', 'OBJECT' 
GO
ALTER TABLE dbo.UserRecruiterComment ADD CONSTRAINT
	PK_UserRecruiterComment PRIMARY KEY CLUSTERED 
	(
	UserRecruiterCommentID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

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
COMMIT
select Has_Perms_By_Name(N'dbo.UserRecruiterComment', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserRecruiterComment', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserRecruiterComment', 'Object', 'CONTROL') as Contr_Per 
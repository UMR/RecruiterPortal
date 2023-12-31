/*
   Monday, November 18, 20198:36:43 PM
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
ALTER TABLE dbo.UserReference
	DROP CONSTRAINT FK_UserReference_User
GO
ALTER TABLE dbo.[User] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.[User]', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.[User]', 'Object', 'CONTROL') as Contr_Per BEGIN TRANSACTION
GO
ALTER TABLE dbo.UserReference
	DROP CONSTRAINT DF__UserRefer__Creat__681373AD
GO
CREATE TABLE dbo.Tmp_UserReference
	(
	UserReferenceID bigint NOT NULL IDENTITY (1, 1),
	RefLastName nvarchar(30) NULL,
	RefFirstName nvarchar(30) NOT NULL,
	RefMiddleName nvarchar(30) NULL,
	NatureOfRelationship nvarchar(50) NOT NULL,
	CompanyName nvarchar(500) NOT NULL,
	EMInstituteID bigint NULL,
	RefPhone nvarchar(50) NULL,
	RefAddress nvarchar(500) NOT NULL,
	UserID bigint NOT NULL,
	CreatedDate datetime NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_UserReference SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_UserReference ADD CONSTRAINT
	DF__UserRefer__Creat__681373AD DEFAULT (getdate()) FOR CreatedDate
GO
SET IDENTITY_INSERT dbo.Tmp_UserReference ON
GO
IF EXISTS(SELECT * FROM dbo.UserReference)
	 EXEC('INSERT INTO dbo.Tmp_UserReference (UserReferenceID, RefLastName, RefFirstName, RefMiddleName, NatureOfRelationship, CompanyName, EMInstituteID, RefPhone, RefAddress, UserID, CreatedDate)
		SELECT UserReferenceID, RefLastName, RefFirstName, RefMiddleName, NatureOfRelationship, CompanyName, EMInstituteID, RefPhone, RefAddress, UserID, CreatedDate FROM dbo.UserReference WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_UserReference OFF
GO
DROP TABLE dbo.UserReference
GO
EXECUTE sp_rename N'dbo.Tmp_UserReference', N'UserReference', 'OBJECT' 
GO
ALTER TABLE dbo.UserReference ADD CONSTRAINT
	PK_UserReference PRIMARY KEY CLUSTERED 
	(
	UserReferenceID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.UserReference ADD CONSTRAINT
	FK_UserReference_User FOREIGN KEY
	(
	UserID
	) REFERENCES dbo.[User]
	(
	UserID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT
select Has_Perms_By_Name(N'dbo.UserReference', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.UserReference', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.UserReference', 'Object', 'CONTROL') as Contr_Per 
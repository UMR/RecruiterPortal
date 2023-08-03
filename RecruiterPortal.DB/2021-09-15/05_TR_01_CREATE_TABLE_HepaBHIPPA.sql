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
CREATE TABLE dbo.HepaBHIPPA
	(
	HepaBHIPPAID bigint NOT NULL IDENTITY (1, 1),
	HasHepaConcent bit NOT NULL,
	HasHepaSheet bit NULL,
	HasHepaTraining bit NULL,
	IsExamined bit NULL,
	HasNoCostHepa bit NULL,
	HasFacilityInfo bit NULL,
	Comment nvarchar(500) NULL,
	SignatureDate datetime NULL,
	WitnessName nvarchar(100) NULL,
	WitnessSignatureDate datetime NULL,
	ComplianceOfficer nvarchar(100) NULL,
	UserID bigint NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.HepaBHIPPA ADD CONSTRAINT
	PK_HepaBHIPPA PRIMARY KEY CLUSTERED 
	(
	HepaBHIPPAID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.HepaBHIPPA ADD CONSTRAINT
	FK_HepaBHIPPA_User1 FOREIGN KEY
	(
	UserID
	) REFERENCES dbo.[User]
	(
	UserID
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.HepaBHIPPA SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.HepaBHIPPA', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.HepaBHIPPA', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.HepaBHIPPA', 'Object', 'CONTROL') as Contr_Per 
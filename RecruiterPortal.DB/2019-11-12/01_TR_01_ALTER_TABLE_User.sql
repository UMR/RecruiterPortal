ALTER TABLE dbo.[User]
ADD CONSTRAINT UQ_UserEmail 
UNIQUE NONCLUSTERED (Email)
WITH (
  PAD_INDEX = OFF,
  IGNORE_DUP_KEY = OFF,
  STATISTICS_NORECOMPUTE = OFF,
  ALLOW_ROW_LOCKS = ON,
  ALLOW_PAGE_LOCKS = ON)
GO

/*
   Tuesday, November 12, 201912:28:49 PM
   User: sa
   Server: LAPTOP-O69TNBVB
   Database: UMRRecruitmentApplicant
   Application: 
*/

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/

ALTER TABLE dbo.[User]
	DROP CONSTRAINT DF__User__IsVerified__4E88ABD4
GO
ALTER TABLE dbo.[User] ADD CONSTRAINT
	DF__User__IsVerified__4E88ABD4 DEFAULT ((0)) FOR IsVerified
GO

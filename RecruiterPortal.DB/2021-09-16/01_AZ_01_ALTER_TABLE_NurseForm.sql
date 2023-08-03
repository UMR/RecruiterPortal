USE [UMRRecruitmentApplicant]
GO

ALTER TABLE dbo.NurseForm  
ALTER COLUMN NursingSchoolCompletedDate [datetime] NULL;  
GO

ALTER TABLE dbo.NurseForm  
ALTER COLUMN SignatureDate [datetime] NULL;  
GO
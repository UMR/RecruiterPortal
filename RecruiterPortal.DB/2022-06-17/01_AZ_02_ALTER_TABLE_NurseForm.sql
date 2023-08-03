USE [UMRRecruitmentApplicant]
GO

ALTER TABLE [dbo].[NurseForm]
ADD [ApplyingForJobType] BIT NULL, [ApplyingForPosition] TINYINT NULL

GO
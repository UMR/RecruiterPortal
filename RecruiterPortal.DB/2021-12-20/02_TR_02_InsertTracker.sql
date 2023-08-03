USE [UMRRecruitmentApplicant]
GO
/****** Script for SelectTopNRows command from SSMS  ******/
INSERT INTO [dbo].[ChangeTracker]
           ([HasNewChanges]
           ,[ChangeDate]
           ,[ImportDate]
           ,[UserID])
SELECT 1, GETDATE(), null, [UserID] FROM [UMRRecruitmentApplicant].[dbo].[User]

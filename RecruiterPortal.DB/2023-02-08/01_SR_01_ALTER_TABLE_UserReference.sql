USE [UMRRecruitmentApplicant]
GO
ALTER TABLE [dbo].[UserReference]
ADD [ReferenceType] [nvarchar](100)

ALTER TABLE [dbo].[UserReference]
ADD [RefEmail] [nvarchar](100)

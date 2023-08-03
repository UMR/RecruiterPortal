USE [UMRRecruitmentApplicant]
GO

UPDATE [dbo].[UserDetails]
   SET [ZipCode] = null,
       [City] = null,
       [StateName] = null
 WHERE ZipCode='00000'
GO


USE [UMRRecruitmentApplicant]
GO

UPDATE [dbo].[UserDetails]
   SET [StreetAddress] = null
 WHERE [StreetAddress]='Not Available'
GO


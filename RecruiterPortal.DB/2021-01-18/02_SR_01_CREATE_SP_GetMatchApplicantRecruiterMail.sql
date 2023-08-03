USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[SP_GETUSERBYUSERNAME]    Script Date: 1/18/2021 12:23:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SP_GetMatchApplicantRecruiterMail]  
   @UserID bigint
AS 
BEGIN      
	SELECT * FROM [UMRRecruitmentApplicant].[dbo].[View_ImportedApplicantMailConfigs] 
	WHERE [UMRRecruitmentApplicant].[dbo].[View_ImportedApplicantMailConfigs].ApplicantPortalUserID = @UserID ORDER BY POP3UserName;
END
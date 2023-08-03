USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_USCIS_Select]    Script Date: 11/1/2021 3:04:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 ALTER PROCEDURE [dbo].[sp_USCIS_Select] (
 	 @UserID bigint
 )
 AS
 SELECT  [USCISID]
 		,[USCISNumber]
 		,[WorkAuthExpiryDate]
 		,[I94AdmissionNumber]
 		,[ForeignPassort]
 		,[TranslatorFirstName]
 		,[TranslatorLastName]
 		,[StreetAddress]
 		,[Apt]
 		,[ZipCode]
 		,[City]
 		,[StateName]
 		,[AdditionalInformation]
 		,[EmploymentDate]
 		,[DocumentTitle]
 		,[DocumentNumber]
 		,[ExpirationDate]
 		,[UserID]
		,[IsNonCitizen]
		,[IsLawFullPermanent]
 		FROM [USCIS]
 WHERE [UserID] = @UserID
 

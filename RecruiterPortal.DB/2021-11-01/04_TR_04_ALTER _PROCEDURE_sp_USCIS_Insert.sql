USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_USCIS_Insert]    Script Date: 11/1/2021 3:04:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sp_USCIS_Insert] (
 	 @USCISNumber nvarchar(500)
 	,@WorkAuthExpiryDate datetime
 	,@I94AdmissionNumber nvarchar(500)
 	,@ForeignPassort nvarchar(500)
 	,@TranslatorFirstName nvarchar(500)
 	,@TranslatorLastName nvarchar(500)
 	,@StreetAddress nvarchar(500)
 	,@Apt nvarchar(50)
 	,@ZipCode nvarchar(50)
 	,@City nvarchar(50)
 	,@StateName nvarchar(50)
 	,@AdditionalInformation nvarchar(1000)
 	,@EmploymentDate datetime
 	,@DocumentTitle nvarchar(500)
 	,@DocumentNumber nvarchar(500)
 	,@ExpirationDate datetime
 	,@UserID bigint
    ,@IsNonCitizen bit
    ,@IsLawFullPermanent bit
 )
 AS
 INSERT INTO [USCIS] (
 	 [USCISNumber]
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
 )
 VALUES (
 	 @USCISNumber
 	,@WorkAuthExpiryDate
 	,@I94AdmissionNumber
 	,@ForeignPassort
 	,@TranslatorFirstName
 	,@TranslatorLastName
 	,@StreetAddress
 	,@Apt
 	,@ZipCode
 	,@City
 	,@StateName
 	,@AdditionalInformation
 	,@EmploymentDate
 	,@DocumentTitle
 	,@DocumentNumber
 	,@ExpirationDate
 	,@UserID
 	,@IsNonCitizen
 	,@IsLawFullPermanent
 )
USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_USCIS_Update]    Script Date: 11/1/2021 3:04:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sp_USCIS_Update] (
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
	,@USCISID bigint
 )
 AS
 UPDATE [USCIS]
 SET [USCISNumber] = @USCISNumber
 	,[WorkAuthExpiryDate] = @WorkAuthExpiryDate
 	,[I94AdmissionNumber] = @I94AdmissionNumber
 	,[ForeignPassort] = @ForeignPassort
 	,[TranslatorFirstName] = @TranslatorFirstName
 	,[TranslatorLastName] = @TranslatorLastName
 	,[StreetAddress] = @StreetAddress
 	,[Apt] = @Apt
 	,[ZipCode] = @ZipCode
 	,[City] = @City
 	,[StateName] = @StateName
 	,[AdditionalInformation] = @AdditionalInformation
 	,[EmploymentDate] = @EmploymentDate
 	,[DocumentTitle] = @DocumentTitle
 	,[DocumentNumber] = @DocumentNumber
 	,[ExpirationDate] = @ExpirationDate
 	,[UserID] = @UserID
 	,[IsNonCitizen] = @IsNonCitizen
 	,[IsLawFullPermanent] = @IsLawFullPermanent
 WHERE [USCISID] = @USCISID
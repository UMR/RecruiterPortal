 CREATE OR ALTER PROCEDURE sp_USCIS_Update (
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
 WHERE [USCISID] = @USCISID
 
 GO
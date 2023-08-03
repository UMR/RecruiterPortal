 CREATE OR ALTER PROCEDURE sp_USCIS_Insert (
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
 )
 GO


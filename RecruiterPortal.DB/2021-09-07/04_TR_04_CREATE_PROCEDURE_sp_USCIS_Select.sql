 CREATE OR ALTER  PROCEDURE sp_USCIS_Select (
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
 		FROM [USCIS]
 WHERE [UserID] = @UserID
 
 GO
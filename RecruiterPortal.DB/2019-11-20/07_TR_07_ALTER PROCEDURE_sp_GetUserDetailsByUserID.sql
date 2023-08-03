USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserDetailsByUserID]    Script Date: 11/20/2019 2:53:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_GetUserDetailsByUserID]
	@UserID bigint
AS
	SET NOCOUNT ON;
	SELECT dbo.[User].First_Name AS FirstName, dbo.[User].Last_Name AS LastName, dbo.[User].Email, dbo.[User].Middle_Name AS MiddleName, dbo.UserDetails.StreetAddress, dbo.UserDetails.Apt AS Apartment, 
							 dbo.UserDetails.ZipCode, dbo.UserDetails.Phone, dbo.UserDetails.SSN AS ssn, dbo.UserDetails.DateAvailable, dbo.UserDetails.DesiredSalary, dbo.UserDetails.DesiredPosition AS PositionAppliedFor, dbo.UserDetails.IsUSCitizen, 
							 dbo.UserDetails.IsAuthorized, dbo.UserDetails.IsOldClient, dbo.UserDetails.IsConvict, dbo.UserDetails.ConvictionDetail, dbo.UserDetails.City, dbo.UserDetails.StateName AS [State], dbo.[User].UserID
	FROM dbo.[User] LEFT OUTER JOIN
							 dbo.UserDetails ON dbo.[User].UserID = dbo.UserDetails.UserID WHERE dbo.[User].UserID = @UserID

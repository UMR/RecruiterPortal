USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserDetailsByUserID]    Script Date: 11/20/2019 1:50:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_GetUserDetailsByUserID]
	@UserID bigint
AS
	SET NOCOUNT ON;
	SELECT dbo.[User].First_Name, dbo.[User].Last_Name, dbo.[User].Email, dbo.[User].Middle_Name, dbo.UserDetails.StreetAddress, dbo.UserDetails.Apt, dbo.UserDetails.ZipCode, dbo.UserDetails.Phone, dbo.UserDetails.SSN, 
			dbo.UserDetails.DateAvailable, dbo.UserDetails.DesiredSalary, dbo.UserDetails.DesiredPositionId, dbo.UserDetails.IsUSCitizen, dbo.UserDetails.IsAuthorized, dbo.UserDetails.IsOldClient, dbo.UserDetails.IsConvict, 
			dbo.UserDetails.ConvictionDetail, dbo.UserDetails.CreatedDate, dbo.[User].UserID
	FROM dbo.[User] LEFT OUTER JOIN dbo.UserDetails ON dbo.[User].UserID = dbo.UserDetails.UserID WHERE dbo.[User].UserID = @UserID

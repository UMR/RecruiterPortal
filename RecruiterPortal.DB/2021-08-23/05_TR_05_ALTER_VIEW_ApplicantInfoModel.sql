USE [UMRRecruitmentApplicant]
GO

/****** Object:  View [dbo].[ApplicantInfoModel]    Script Date: 8/23/2021 2:44:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[ApplicantInfoModel]
AS
SELECT        dbo.[User].First_Name AS FirstName, dbo.[User].Last_Name AS LastName, dbo.[User].Email, dbo.[User].Middle_Name AS MiddleName, dbo.UserDetails.StreetAddress, dbo.UserDetails.Apt AS Apartment, 
                         dbo.UserDetails.ZipCode, dbo.UserDetails.Phone, dbo.UserDetails.SSN, dbo.UserDetails.DateAvailable, dbo.UserDetails.DesiredSalary, dbo.UserDetails.DesiredPosition AS PositionAppliedFor, dbo.UserDetails.IsUSCitizen, 
                         dbo.UserDetails.IsAuthorized, dbo.UserDetails.IsOldClient, dbo.UserDetails.IsConvict, dbo.UserDetails.ConvictionDetail, dbo.UserDetails.City, dbo.UserDetails.StateName AS State, dbo.[User].UserID, 
                         dbo.UserDetails.DateOfBirth, dbo.UserDetails.Gender, dbo.UserDetails.CountryOfBirth, dbo.UserDetails.CountryFromApplied, dbo.UserPhysical.Height, dbo.UserPhysical.EyeColor, dbo.UserPhysical.Race, 
                         dbo.UserPhysical.Weight, dbo.UserPhysical.HairColor
FROM            dbo.[User] LEFT OUTER JOIN
                         dbo.UserPhysical ON dbo.[User].UserID = dbo.UserPhysical.UserID LEFT OUTER JOIN
                         dbo.UserDetails ON dbo.[User].UserID = dbo.UserDetails.UserID
GO



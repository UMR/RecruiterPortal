USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserDetails]    Script Date: 11/27/2019 11:18:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertUserDetails]
(
	@LastName nvarchar (MAX),
	@FirstName nvarchar (MAX),
	@MiddleName nvarchar (MAX),
	@StreetAddress nvarchar(500),
	@Apartment nvarchar(50) = null,
	@ZipCode nvarchar(50),
	@City nvarchar(50),
	@State nvarchar(50),
	@Phone nvarchar(50),
	@SSN nvarchar(10) = null,
	@DateAvailable datetime = null,
	@DesiredSalary nvarchar(200) = null,
	@PositionAppliedFor nvarchar(500) = null,
	@IsUSCitizen bit,
	@IsAuthorized bit,
	@IsOldClient bit,
	@IsConvict bit,
	@ConvictionDetail nvarchar(500),
	@UserID bigint,
	@DateOfBirth datetime = null,
	@Gender nvarchar(20) = null,
	@CountryOfBirth nvarchar(50) = null,
	@CountryFromApplied nvarchar(50) = null
)
AS
	SET NOCOUNT OFF;
	UPDATE [User] SET First_Name = @FirstName,Last_Name = @LastName,Middle_Name = @MiddleName WHERE UserID = @UserID

	DELETE FROM [UserDetails] WHERE ((UserID = @UserID))

	INSERT INTO [UserDetails] ([StreetAddress], [Apt], [ZipCode], [Phone], [SSN], [DateAvailable], [DesiredSalary], 
	[DesiredPosition], [IsUSCitizen], [IsAuthorized], [IsOldClient], [IsConvict], [ConvictionDetail], [UserID], [City], [StateName],
	[DateOfBirth], [Gender], [CountryOfBirth], [CountryFromApplied]) VALUES 
	(@StreetAddress, @Apartment, @ZipCode, @Phone, @SSN, @DateAvailable, @DesiredSalary, @PositionAppliedFor, @IsUSCitizen, @IsAuthorized, @IsOldClient, @IsConvict, @ConvictionDetail, @UserID, @City, @State
	,@DateOfBirth, @Gender, @CountryOfBirth, @CountryFromApplied);
	
	SELECT dbo.[User].First_Name AS FirstName, dbo.[User].Last_Name AS LastName, dbo.[User].Email, dbo.[User].Password, dbo.[User].Middle_Name AS MiddleName, dbo.UserDetails.StreetAddress, 
	dbo.UserDetails.Apt AS Apartment, dbo.UserDetails.ZipCode, dbo.UserDetails.Phone, dbo.UserDetails.SSN AS ssn, dbo.UserDetails.DateAvailable, dbo.UserDetails.DesiredSalary, 
	dbo.UserDetails.DesiredPosition AS PositionAppliedFor, dbo.UserDetails.IsUSCitizen, dbo.UserDetails.IsAuthorized, dbo.UserDetails.IsOldClient, dbo.UserDetails.IsConvict, 
	dbo.UserDetails.ConvictionDetail, dbo.UserDetails.City, dbo.UserDetails.StateName AS [State], dbo.[User].UserID,
	dbo.UserDetails.DateOfBirth, dbo.UserDetails.Gender, dbo.UserDetails.CountryOfBirth, dbo.UserDetails.CountryFromApplied
	FROM dbo.[User] LEFT OUTER JOIN dbo.UserDetails ON dbo.[User].UserID = dbo.UserDetails.UserID WHERE dbo.[User].UserID = @UserID


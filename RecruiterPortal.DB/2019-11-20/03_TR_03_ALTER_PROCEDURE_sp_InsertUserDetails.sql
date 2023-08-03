USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserDetails]    Script Date: 11/20/2019 1:56:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertUserDetails]
(
	@StreetAddress nvarchar(500),
	@Apt nvarchar(50),
	@ZipCode nvarchar(50),
	@Phone nvarchar(50),
	@SSN nvarchar(10),
	@DateAvailable datetime,
	@DesiredSalary nvarchar(200),
	@DesiredPositionId int,
	@IsUSCitizen bit,
	@IsAuthorized bit,
	@IsOldClient bit,
	@IsConvict bit,
	@ConvictionDetail nvarchar(500),
	@UserID bigint,
	@First_Name nvarchar (MAX),
	@Last_Name nvarchar (MAX),
	@Middle_Name nvarchar (MAX)
)
AS
	SET NOCOUNT OFF;
	UPDATE [User] SET First_Name = @First_Name,Last_Name = @Last_Name,Middle_Name = @Middle_Name WHERE UserID = @UserID

	DELETE FROM [UserDetails] WHERE ((UserID = @UserID))

	INSERT INTO [UserDetails] ([StreetAddress], [Apt], [ZipCode], [Phone], [SSN], [DateAvailable], [DesiredSalary], [DesiredPositionId], [IsUSCitizen], [IsAuthorized], [IsOldClient], [IsConvict], [ConvictionDetail], [UserID]) VALUES (@StreetAddress, @Apt, @ZipCode, @Phone, @SSN, @DateAvailable, @DesiredSalary, @DesiredPositionId, @IsUSCitizen, @IsAuthorized, @IsOldClient, @IsConvict, @ConvictionDetail, @UserID);
	
	SELECT UserDetailsID, StreetAddress, Apt, ZipCode, Phone, SSN, DateAvailable, DesiredSalary, DesiredPositionId, IsUSCitizen, IsAuthorized, IsOldClient, IsConvict, ConvictionDetail, UserID, CreatedDate FROM UserDetails WHERE (UserDetailsID = SCOPE_IDENTITY())

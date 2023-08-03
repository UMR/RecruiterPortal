IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_GetUserDetailsByUserID' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_GetUserDetailsByUserID
GO

CREATE PROCEDURE [dbo].sp_GetUserDetailsByUserID
	@UserID bigint
AS
	SET NOCOUNT ON;
	SELECT  * FROM  UserDetails WHERE [UserID] = @UserID
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_InsertUserDetails' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_InsertUserDetails
GO

CREATE PROCEDURE [dbo].sp_InsertUserDetails
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
	@CreatedDate datetime
)
AS
	SET NOCOUNT OFF;
	INSERT INTO [UserDetails] ([StreetAddress], [Apt], [ZipCode], [Phone], [SSN], [DateAvailable], [DesiredSalary], [DesiredPositionId], [IsUSCitizen], [IsAuthorized], [IsOldClient], [IsConvict], [ConvictionDetail], [UserID], [CreatedDate]) VALUES (@StreetAddress, @Apt, @ZipCode, @Phone, @SSN, @DateAvailable, @DesiredSalary, @DesiredPositionId, @IsUSCitizen, @IsAuthorized, @IsOldClient, @IsConvict, @ConvictionDetail, @UserID, @CreatedDate);
	
	SELECT UserDetailsID, StreetAddress, Apt, ZipCode, Phone, SSN, DateAvailable, DesiredSalary, DesiredPositionId, IsUSCitizen, IsAuthorized, IsOldClient, IsConvict, ConvictionDetail, UserID, CreatedDate FROM UserDetails WHERE (UserDetailsID = SCOPE_IDENTITY())
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_UpdateUserDetailsByUserDetailsID' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_UpdateUserDetailsByUserDetailsID
GO

CREATE PROCEDURE [dbo].sp_UpdateUserDetailsByUserDetailsID
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
	@CreatedDate datetime,
	@UserDetailsID bigint
)
AS
	SET NOCOUNT OFF;
	UPDATE [UserDetails] SET [StreetAddress] = @StreetAddress, [Apt] = @Apt, [ZipCode] = @ZipCode, [Phone] = @Phone, [SSN] = @SSN, [DateAvailable] = @DateAvailable, [DesiredSalary] = @DesiredSalary, [DesiredPositionId] = @DesiredPositionId, [IsUSCitizen] = @IsUSCitizen, [IsAuthorized] = @IsAuthorized, [IsOldClient] = @IsOldClient, [IsConvict] = @IsConvict, [ConvictionDetail] = @ConvictionDetail, [UserID] = @UserID, [CreatedDate] = @CreatedDate WHERE (([UserDetailsID] = @UserDetailsID));
	
	SELECT UserDetailsID, StreetAddress, Apt, ZipCode, Phone, SSN, DateAvailable, DesiredSalary, DesiredPositionId, IsUSCitizen, IsAuthorized, IsOldClient, IsConvict, ConvictionDetail, UserID, CreatedDate FROM UserDetails WHERE (UserDetailsID = @UserDetailsID)
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_DeleteByUserID' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_DeleteByUserID
GO

CREATE PROCEDURE [dbo].sp_DeleteByUserDetailsID
(
	@UserDetailsID bigint
)
AS
	SET NOCOUNT OFF;
	DELETE FROM [UserDetails] WHERE (([UserDetailsID] = @UserDetailsID))
GO


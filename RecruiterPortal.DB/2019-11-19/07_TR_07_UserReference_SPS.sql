IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_GetUserReferenceByUserID' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_GetUserReferenceByUserID
GO

CREATE PROCEDURE [dbo].sp_GetUserReferenceByUserID
	@UserID bigint
AS
	SET NOCOUNT ON;
	SELECT * FROM UserReference WHERE [UserID] = @UserID
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_InsertUserReference' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_InsertUserReference
GO

CREATE PROCEDURE [dbo].sp_InsertUserReference
(
	@RefLastName nvarchar(30),
	@RefFirstName nvarchar(30),
	@RefMiddleName nvarchar(30),
	@NatureOfRelationship nvarchar(50),
	@CompanyName nvarchar(500),
	@EMInstituteID bigint,
	@RefPhone nvarchar(50),
	@RefAddress nvarchar(500),
	@UserID bigint,
	@CreatedDate datetime
)
AS
	SET NOCOUNT OFF;
	INSERT INTO [UserReference] ([RefLastName], [RefFirstName], [RefMiddleName], [NatureOfRelationship], [CompanyName], [EMInstituteID], [RefPhone], [RefAddress], [UserID], [CreatedDate]) VALUES (@RefLastName, @RefFirstName, @RefMiddleName, @NatureOfRelationship, @CompanyName, @EMInstituteID, @RefPhone, @RefAddress, @UserID, @CreatedDate);
	
	SELECT UserReferenceID, RefLastName, RefFirstName, RefMiddleName, NatureOfRelationship, CompanyName, EMInstituteID, RefPhone, RefAddress, UserID, CreatedDate FROM UserReference WHERE (UserReferenceID = SCOPE_IDENTITY())
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_UpdateUserReferenceByUserReferenceID' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_UpdateUserReferenceByUserReferenceID
GO

CREATE PROCEDURE [dbo].sp_UpdateUserReferenceByUserReferenceID
(
	@RefLastName nvarchar(30),
	@RefFirstName nvarchar(30),
	@RefMiddleName nvarchar(30),
	@NatureOfRelationship nvarchar(50),
	@CompanyName nvarchar(500),
	@EMInstituteID bigint,
	@RefPhone nvarchar(50),
	@RefAddress nvarchar(500),
	@UserID bigint,
	@CreatedDate datetime,
	@UserReferenceID bigint
)
AS
	SET NOCOUNT OFF;
	UPDATE [UserReference] SET [RefLastName] = @RefLastName, [RefFirstName] = @RefFirstName, [RefMiddleName] = @RefMiddleName, [NatureOfRelationship] = @NatureOfRelationship, [CompanyName] = @CompanyName, [EMInstituteID] = @EMInstituteID, [RefPhone] = @RefPhone, [RefAddress] = @RefAddress, [UserID] = @UserID, [CreatedDate] = @CreatedDate WHERE (([UserReferenceID] = @UserReferenceID));
	
	SELECT UserReferenceID, RefLastName, RefFirstName, RefMiddleName, NatureOfRelationship, CompanyName, EMInstituteID, RefPhone, RefAddress, UserID, CreatedDate FROM UserReference WHERE (UserReferenceID = @UserReferenceID)
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_DeleteUserReferenceByUserReferenceID' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_DeleteUserReferenceByUserReferenceID
GO

CREATE PROCEDURE [dbo].sp_DeleteUserReferenceByUserReferenceID
(
	@UserReferenceID bigint
)
AS
	SET NOCOUNT OFF;
	DELETE FROM [UserReference] WHERE (([UserReferenceID] = @UserReferenceID))
GO


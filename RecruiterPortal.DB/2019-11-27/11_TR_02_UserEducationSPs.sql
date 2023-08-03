IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_GetEducationByEduID' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_GetEducationByEduID
GO

CREATE PROCEDURE [dbo].sp_GetEducationByEduID
	@UserEducationID bigint
AS
	SET NOCOUNT ON;
SELECT * FROM [dbo].[UserEducation] WHERE (([UserEducationID] = @UserEducationID)) 
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_InsertEducation' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_InsertEducation
GO

CREATE PROCEDURE [dbo].sp_InsertEducation
(
	@SchoolName nvarchar(500),
	@SchoolAddress nvarchar(500),
	@Degree nvarchar(500),
	@FromDate datetime,
	@ToDate datetime,
	@IsGraduate bit,
	@UserID bigint,
	@CreatedDate datetime,
	@InstitutionType tinyint
)
AS
	SET NOCOUNT OFF;
INSERT INTO [dbo].[UserEducation] ([SchoolName], [SchoolAddress], [Degree], [FromDate], [ToDate], [IsGraduate], [UserID], [CreatedDate], [InstitutionType]) VALUES (@SchoolName, @SchoolAddress, @Degree, @FromDate, @ToDate, @IsGraduate, @UserID, @CreatedDate, @InstitutionType);
	
SELECT UserEducationID, SchoolName, SchoolAddress, Degree, FromDate, ToDate, IsGraduate, UserID, CreatedDate, InstitutionType FROM UserEducation WHERE (UserEducationID = SCOPE_IDENTITY())
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_UpdateEducationByEduID' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_UpdateEducationByEduID
GO

CREATE PROCEDURE [dbo].sp_UpdateEducationByEduID
(
	@SchoolName nvarchar(500),
	@SchoolAddress nvarchar(500),
	@Degree nvarchar(500),
	@FromDate datetime,
	@ToDate datetime,
	@IsGraduate bit,
	@UserID bigint,
	@InstitutionType tinyint,
	@UserEducationID bigint
)
AS
	SET NOCOUNT OFF;
UPDATE [dbo].[UserEducation] SET [SchoolName] = @SchoolName, [SchoolAddress] = @SchoolAddress, [Degree] = @Degree, [FromDate] = @FromDate, [ToDate] = @ToDate, [IsGraduate] = @IsGraduate, [UserID] = @UserID, [InstitutionType] = @InstitutionType WHERE (([UserEducationID] = @UserEducationID));
	
SELECT UserEducationID, SchoolName, SchoolAddress, Degree, FromDate, ToDate, IsGraduate, UserID, CreatedDate, InstitutionType FROM UserEducation WHERE (UserEducationID = @UserEducationID)
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_DeleteEducation' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_DeleteEducation
GO

CREATE PROCEDURE [dbo].sp_DeleteEducation
(
	@UserEducationID bigint
)
AS
	SET NOCOUNT OFF;
DELETE FROM [dbo].[UserEducation] WHERE (([UserEducationID] = @UserEducationID))
GO

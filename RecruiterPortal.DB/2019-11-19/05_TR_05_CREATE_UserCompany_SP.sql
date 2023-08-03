EXEC sp_rename N'dbo.UserCompany.UseCompanyID', N'UserCompanyID', 'COLUMN'
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_GetUserCompanyByUserID' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_GetUserCompanyByUserID
GO

CREATE PROCEDURE [dbo].sp_GetUserCompanyByUserID
	@UserID bigint
AS
	SET NOCOUNT ON;
	SELECT * FROM [dbo].[UserCompany] WHERE [UserID] = @UserID
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_InsertUserCompany' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_InsertUserCompany
GO

CREATE PROCEDURE [dbo].sp_InsertUserCompany
(
	@CompanyName nvarchar(500),
	@EMInstituteID bigint,
	@CompanyAddress nvarchar(500),
	@Supervisor nvarchar(250),
	@CompanyPhone nvarchar(50),
	@JobTItle nvarchar(500),
	@EMPositionID bigint,
	@StartingSalary nvarchar(200),
	@EndingSalary nvarchar(200),
	@FromDate datetime,
	@ToDate datetime,
	@UserID bigint,
	@CanContactThisEmployer bit,
	@LeaveReason nvarchar(500)
)
AS
	SET NOCOUNT OFF;
	INSERT INTO [dbo].[UserCompany] ([CompanyName], [EMInstituteID], [CompanyAddress], [Supervisor], [CompanyPhone], [JobTItle], [EMPositionID], [StartingSalary], [EndingSalary], [FromDate], [ToDate], [UserID], [CanContactThisEmployer], [LeaveReason]) VALUES (@CompanyName, @EMInstituteID, @CompanyAddress, @Supervisor, @CompanyPhone, @JobTItle, @EMPositionID, @StartingSalary, @EndingSalary, @FromDate, @ToDate, @UserID, @CanContactThisEmployer, @LeaveReason);
		
	SELECT UserCompanyID, CompanyName, EMInstituteID, CompanyAddress, Supervisor, CompanyPhone, JobTItle, EMPositionID, StartingSalary, EndingSalary, FromDate, ToDate, UserID, CanContactThisEmployer, LeaveReason FROM UserCompany WHERE (UserCompanyID = SCOPE_IDENTITY())
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_UpdateUserCompany' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_UpdateUserCompany
GO

CREATE PROCEDURE [dbo].sp_UpdateUserCompany
(
	@CompanyName nvarchar(500),
	@EMInstituteID bigint,
	@CompanyAddress nvarchar(500),
	@Supervisor nvarchar(250),
	@CompanyPhone nvarchar(50),
	@JobTItle nvarchar(500),
	@EMPositionID bigint,
	@StartingSalary nvarchar(200),
	@EndingSalary nvarchar(200),
	@FromDate datetime,
	@ToDate datetime,
	@UserID bigint,
	@CanContactThisEmployer bit,
	@LeaveReason nvarchar(500),
	@UserCompanyID bigint
)
AS
	SET NOCOUNT OFF;
	UPDATE [dbo].[UserCompany] SET [CompanyName] = @CompanyName, [EMInstituteID] = @EMInstituteID, [CompanyAddress] = @CompanyAddress, [Supervisor] = @Supervisor, [CompanyPhone] = @CompanyPhone, [JobTItle] = @JobTItle, [EMPositionID] = @EMPositionID, [StartingSalary] = @StartingSalary, [EndingSalary] = @EndingSalary, [FromDate] = @FromDate, [ToDate] = @ToDate, [UserID] = @UserID, [CanContactThisEmployer] = @CanContactThisEmployer, [LeaveReason] = @LeaveReason 
	WHERE ([UserCompanyID] = @UserCompanyID);
	
	SELECT UserCompanyID, CompanyName, EMInstituteID, CompanyAddress, Supervisor, CompanyPhone, JobTItle, EMPositionID, StartingSalary, EndingSalary, FromDate, ToDate, UserID, CanContactThisEmployer, LeaveReason FROM UserCompany WHERE (UserCompanyID = @UserCompanyID)
GO

IF EXISTS (SELECT * FROM sysobjects WHERE name = 'sp_DeleteUserCompanyByCompanyID' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].sp_DeleteUserCompanyByCompanyID
GO

CREATE PROCEDURE [dbo].sp_DeleteUserCompanyByCompanyID
(
	@UserCompanyID bigint
)
AS
	SET NOCOUNT OFF;
	DELETE FROM [dbo].[UserCompany] WHERE ([UserCompanyID] = @UserCompanyID)
GO
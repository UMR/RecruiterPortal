USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserCompany]    Script Date: 11/28/2019 6:30:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_UpdateUserCompany]
(
	@CompanyName nvarchar(500),
	@EMInstituteID bigint = null,
	@CompanyAddress nvarchar(500) = null,
	@Supervisor nvarchar(250) = null,
	@CompanyPhone nvarchar(50),
	@JobTItle nvarchar(500),
	@EMPositionID bigint,
	@StartingSalary nvarchar(200) = null,
	@EndingSalary nvarchar(200) = null,
	@FromDate datetime = null,
	@ToDate datetime = null,
	@UserID bigint,
	@CanContactThisEmployer bit,
	@LeaveReason nvarchar(500) = null,
	@UserCompanyID bigint,
	@Responisiblities varchar(500) = null
)
AS
	SET NOCOUNT OFF;
	UPDATE [dbo].[UserCompany] SET [CompanyName] = @CompanyName, [EMInstituteID] = @EMInstituteID, [CompanyAddress] = @CompanyAddress, [Supervisor] = @Supervisor, [CompanyPhone] = @CompanyPhone, [JobTItle] = @JobTItle, [EMPositionID] = @EMPositionID, [StartingSalary] = @StartingSalary, [EndingSalary] = @EndingSalary, [FromDate] = @FromDate, [ToDate] = @ToDate, [UserID] = @UserID, [CanContactThisEmployer] = @CanContactThisEmployer, [LeaveReason] = @LeaveReason, [Responisiblities] = @Responisiblities 
	WHERE ([UserCompanyID] = @UserCompanyID);
	
	SELECT UserCompanyID, CompanyName, EMInstituteID, CompanyAddress, Supervisor, CompanyPhone, JobTItle, EMPositionID, StartingSalary, EndingSalary, FromDate, ToDate, UserID, CanContactThisEmployer, LeaveReason, Responisiblities FROM UserCompany WHERE (UserCompanyID = @UserCompanyID)


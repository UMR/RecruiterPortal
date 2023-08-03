USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserCompany]    Script Date: 11/28/2019 6:30:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertUserCompany]
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
	@Responisiblities varchar(500) = null
)
AS
	SET NOCOUNT OFF;
	INSERT INTO [dbo].[UserCompany] ([CompanyName], [EMInstituteID], [CompanyAddress], [Supervisor], [CompanyPhone], [JobTItle], [EMPositionID], [StartingSalary], [EndingSalary], [FromDate], [ToDate], [UserID], [CanContactThisEmployer], [LeaveReason],[Responisiblities]) 
		VALUES 
	(@CompanyName, @EMInstituteID, @CompanyAddress, @Supervisor, @CompanyPhone, @JobTItle, @EMPositionID, @StartingSalary, @EndingSalary, @FromDate, @ToDate, @UserID, @CanContactThisEmployer, @LeaveReason, @Responisiblities);
		
	SELECT UserCompanyID, CompanyName, EMInstituteID, CompanyAddress, Supervisor, CompanyPhone, JobTItle, EMPositionID, StartingSalary, EndingSalary, FromDate, ToDate, UserID, CanContactThisEmployer, LeaveReason, Responisiblities FROM UserCompany WHERE (UserCompanyID = SCOPE_IDENTITY())


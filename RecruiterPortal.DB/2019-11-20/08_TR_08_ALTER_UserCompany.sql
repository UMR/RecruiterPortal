ALTER TABLE dbo.UserCompany
ADD Responisiblities varchar(500) NULL
GO

ALTER TABLE dbo.UserCompany
ALTER COLUMN Responisiblities varchar(500) NOT NULL
GO

USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserCompany]    Script Date: 11/20/2019 8:19:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertUserCompany]
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
	@Responisiblities varchar(500)
)
AS
	SET NOCOUNT OFF;
	INSERT INTO [dbo].[UserCompany] ([CompanyName], [EMInstituteID], [CompanyAddress], [Supervisor], [CompanyPhone], [JobTItle], [EMPositionID], [StartingSalary], [EndingSalary], [FromDate], [ToDate], [UserID], [CanContactThisEmployer], [LeaveReason],[Responisiblities]) 
		VALUES 
	(@CompanyName, @EMInstituteID, @CompanyAddress, @Supervisor, @CompanyPhone, @JobTItle, @EMPositionID, @StartingSalary, @EndingSalary, @FromDate, @ToDate, @UserID, @CanContactThisEmployer, @LeaveReason, @Responisiblities);
		
	SELECT UserCompanyID, CompanyName, EMInstituteID, CompanyAddress, Supervisor, CompanyPhone, JobTItle, EMPositionID, StartingSalary, EndingSalary, FromDate, ToDate, UserID, CanContactThisEmployer, LeaveReason, Responisiblities FROM UserCompany WHERE (UserCompanyID = SCOPE_IDENTITY())

GO

USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserCompany]    Script Date: 11/20/2019 8:22:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_UpdateUserCompany]
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
	@UserCompanyID bigint,
	@Responisiblities varchar(500)
)
AS
	SET NOCOUNT OFF;
	UPDATE [dbo].[UserCompany] SET [CompanyName] = @CompanyName, [EMInstituteID] = @EMInstituteID, [CompanyAddress] = @CompanyAddress, [Supervisor] = @Supervisor, [CompanyPhone] = @CompanyPhone, [JobTItle] = @JobTItle, [EMPositionID] = @EMPositionID, [StartingSalary] = @StartingSalary, [EndingSalary] = @EndingSalary, [FromDate] = @FromDate, [ToDate] = @ToDate, [UserID] = @UserID, [CanContactThisEmployer] = @CanContactThisEmployer, [LeaveReason] = @LeaveReason, [Responisiblities] = @Responisiblities 
	WHERE ([UserCompanyID] = @UserCompanyID);
	
	SELECT UserCompanyID, CompanyName, EMInstituteID, CompanyAddress, Supervisor, CompanyPhone, JobTItle, EMPositionID, StartingSalary, EndingSalary, FromDate, ToDate, UserID, CanContactThisEmployer, LeaveReason, Responisiblities FROM UserCompany WHERE (UserCompanyID = @UserCompanyID)

GO
-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE sp_GetUserCompanyByUserCompanyID 
	-- Add the parameters for the stored procedure here
	@UserCompanyID bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM [dbo].[UserCompany] WHERE UserCompanyID = @UserCompanyID
END
GO
USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertRecruiterRole]    Script Date: 9/8/2023 12:37:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertRecruiterRole]
(
	@RecruiterId int,
	@RoleID int,
	@CreatedBy int,
	@CreatedDate datetime
)
AS
	SET NOCOUNT OFF;

INSERT INTO [dbo].[RecruiterRoles]
           ([RecruiterId]
           ,[RoleID]
           ,[CreatedBy]
           ,[CreatedDate])
     VALUES
           (@RecruiterId
           ,@RoleID
           ,@CreatedBy
           ,@CreatedDate)

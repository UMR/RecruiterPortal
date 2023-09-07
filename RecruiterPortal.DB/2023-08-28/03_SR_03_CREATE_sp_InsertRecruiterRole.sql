USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertRecruiterRole]    Script Date: 9/7/2023 4:05:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertRecruiterRole]
(
	@UserID int,
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
           (@UserID
           ,@RoleID
           ,@CreatedBy
           ,@CreatedDate)

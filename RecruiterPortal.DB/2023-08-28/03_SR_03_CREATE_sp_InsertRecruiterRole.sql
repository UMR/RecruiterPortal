
USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertRecruiterRole]    Script Date: 8/29/2023 8:12:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_InsertRecruiterRole]
(
	@UserID int,
	@RoleID int,
	@CreatedBy int,
	@CreatedDate datetime
)
AS
	SET NOCOUNT OFF;

INSERT INTO [dbo].[RecruiterRoles]
           ([UserID]
           ,[RoleID]
           ,[CreatedBy]
           ,[CreatedDate])
     VALUES
           (@UserID
           ,@RoleID
           ,@CreatedBy
           ,@CreatedDate)
GO
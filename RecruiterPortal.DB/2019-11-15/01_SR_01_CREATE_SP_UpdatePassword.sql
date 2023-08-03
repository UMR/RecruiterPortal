USE [UMRRecruitmentApplicant]
GO

SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE dbo.sp_UpdatePassword
(
	@p_UserID bigint,
	@p_Password nvarchar (MAX)
)

AS
UPDATE [User] 
SET 
[Password] = @p_Password
WHERE
UserID = @p_UserID


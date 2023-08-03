USE [UMRRecruitmentApplicant]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetUserSocialUserID]
	@UserID bigint
AS
	SET NOCOUNT ON;

	SELECT * FROM dbo.[UserSocial] WHERE UserID = @UserID

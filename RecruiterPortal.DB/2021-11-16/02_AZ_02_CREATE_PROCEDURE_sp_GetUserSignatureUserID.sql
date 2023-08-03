USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserSignatureUserID]    Script Date: 11/16/2021 12:27:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetUserSignatureUserID]
	@UserID bigint
AS
	SET NOCOUNT ON;
	SELECT * FROM [dbo].[UserSignature] WHERE UserID = @UserID

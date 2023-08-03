USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetTermsConditionsByUserID]    Script Date: 9/15/2021 4:23:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER   PROCEDURE [dbo].[sp_GetTermsConditionsByUserID]
	@UserID bigint
AS
	SET NOCOUNT ON;
	SELECT * FROM dbo.[TermsConditions] WHERE UserID = @UserID

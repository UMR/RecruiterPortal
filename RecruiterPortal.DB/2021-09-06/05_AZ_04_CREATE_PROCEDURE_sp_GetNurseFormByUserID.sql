USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetNurseFormByUserID]    Script Date: 9/7/2021 1:52:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetNurseFormByUserID]
	@UserID bigint
AS
	SET NOCOUNT ON;
	SELECT * FROM dbo.[NurseForm] WHERE UserID = @UserID

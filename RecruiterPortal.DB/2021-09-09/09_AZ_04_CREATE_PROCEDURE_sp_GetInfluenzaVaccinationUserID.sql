USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetInfluenzaVaccinationUserID]    Script Date: 9/9/2021 1:52:37 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_GetInfluenzaVaccinationUserID]
	@UserID bigint
AS
	SET NOCOUNT ON;
	SELECT * FROM dbo.[InfluenzaVaccination] WHERE UserID = @UserID

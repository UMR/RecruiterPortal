USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateInfluenzaVaccination]    Script Date: 9/9/2021 7:43:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateInfluenzaVaccination]
(
	@FacilityName nvarchar(500) NULL,
	@ReasonDeclination nvarchar(500) NULL,
	@Signature nvarchar(500) NULL,
	@EntryDate datetime NULL,	
	@Name nvarchar(500) NULL,
	@Department nvarchar(500) NULL,
	@UserID bigint,	
	@InfluenzaVaccinationID bigint
)

AS
BEGIN
UPDATE [dbo].[InfluenzaVaccination]
	SET	 [FacilityName] = @FacilityName
		,[ReasonDeclination] = @ReasonDeclination
		,[Signature] = @Signature
		,[EntryDate] = @EntryDate
		,[Name] = @Name
		,[Department] = @Department
		,[UserID] = @UserID			
WHERE [InfluenzaVaccinationID] = @InfluenzaVaccinationID

END

USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteUserFile]    Script Date: 28-Nov-19 12:44:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteUserLicense]

(
	@LicenseID bigint
)

AS
DELETE FROM [UserLicense]

WHERE LicenseID = @LicenseID



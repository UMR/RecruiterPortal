USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetEducationByUserID]    Script Date: 8/31/2022 7:30:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetEducationByUserIDAndInstitutionType]
(
    @UserID bigint,
	@InstitutionType int
)

AS

SELECT * FROM [dbo].[UserEducation] WHERE UserID=@UserID AND InstitutionType=@InstitutionType;

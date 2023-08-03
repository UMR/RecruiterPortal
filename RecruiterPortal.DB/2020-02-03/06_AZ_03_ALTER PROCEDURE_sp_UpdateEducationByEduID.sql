USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateEducationByEduID]    Script Date: 02/03/20 2:58:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_UpdateEducationByEduID]
(
	@SchoolName nvarchar(500),
	@SchoolAddress nvarchar(500),
	@Degree nvarchar(500),
	@FromDate int null,
	@ToDate int null,
	@IsGraduate bit,
	@UserID bigint,
	@InstitutionType tinyint,
	@UserEducationID bigint
)
AS
	SET NOCOUNT OFF;
UPDATE [dbo].[UserEducation] SET [SchoolName] = @SchoolName, [SchoolAddress] = @SchoolAddress, [Degree] = @Degree, [FromDate] = @FromDate, [ToDate] = @ToDate, [IsGraduate] = @IsGraduate, [UserID] = @UserID, [InstitutionType] = @InstitutionType WHERE (([UserEducationID] = @UserEducationID));
	
SELECT UserEducationID, SchoolName, SchoolAddress, Degree, FromDate, ToDate, IsGraduate, UserID, CreatedDate, InstitutionType FROM UserEducation WHERE (UserEducationID = @UserEducationID)

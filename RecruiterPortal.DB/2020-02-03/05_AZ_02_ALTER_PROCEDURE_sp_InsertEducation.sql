USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertEducation]    Script Date: 02/03/20 2:55:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertEducation]
(
	@SchoolName nvarchar(500),
	@SchoolAddress nvarchar(500),
	@Degree nvarchar(500),
	@FromDate int null,
	@ToDate int null,
	@IsGraduate bit,
	@UserID bigint,
	@CreatedDate datetime,
	@InstitutionType tinyint
)
AS
	SET NOCOUNT OFF;
INSERT INTO [dbo].[UserEducation] ([SchoolName], [SchoolAddress], [Degree], [FromDate], [ToDate], [IsGraduate], [UserID], [CreatedDate], [InstitutionType]) VALUES (@SchoolName, @SchoolAddress, @Degree, @FromDate, @ToDate, @IsGraduate, @UserID, @CreatedDate, @InstitutionType);
	
SELECT UserEducationID, SchoolName, SchoolAddress, Degree, FromDate, ToDate, IsGraduate, UserID, CreatedDate, InstitutionType FROM UserEducation WHERE (UserEducationID = SCOPE_IDENTITY())

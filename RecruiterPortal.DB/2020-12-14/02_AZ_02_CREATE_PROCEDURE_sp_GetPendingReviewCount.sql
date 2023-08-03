USE [UMRRecruitementDB_New]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetPendingReviewCount]    Script Date: 12/14/2020 12:03:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetPendingReviewCount] 
	-- Add the parameters for the stored procedure here	
	@p_CreatedDT_To DATETIME = NULL,
	@p_CreatedDT_From DATETIME = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT COUNT(ImportUser.AppUserId) AS RowNumber FROM
	(	
		SELECT AppPortal.UserID AS AppUserId
			FROM [UMRRecruitementDB_New].[dbo].[ImportUserFromApplicantPortal] AS AppPortal
				INNER JOIN [UMRRecruitmentApplicant].[dbo].[UserFile] AS UserFile ON AppPortal.UserID = UserFile.UserID
			WHERE AppPortal.[UserID] NOT IN (SELECT [ApplicantPortalUserID] FROM [dbo].[ImportedApplicant]) 	
				AND (@p_CreatedDT_To IS NULL OR (UserFile.CreatedDate <= @p_CreatedDT_To ))
				AND (@p_CreatedDT_From IS NULL OR (UserFile.CreatedDate >= @p_CreatedDT_From ))
			GROUP BY AppPortal.UserID
	) AS ImportUser
  
END




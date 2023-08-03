USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserFileDetails]    Script Date: 10/14/2020 12:12:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetUserFileDetailsByFileType]

(
	@p_UserID bigint,
	@p_FileType tinyint
)

AS
SELECT * FROM [UserFile]

WHERE
UserID = @p_UserID AND FileType = @p_FileType

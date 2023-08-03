USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserFileDetails]    Script Date: 11/15/2019 2:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetUserFileDetails]

(
	@p_UserFileID bigint
)

AS
SELECT * FROM [UserFile]

WHERE
UserFileID = @p_UserFileID

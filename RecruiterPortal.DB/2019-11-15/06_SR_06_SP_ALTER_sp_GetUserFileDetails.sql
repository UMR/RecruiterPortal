USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserFileDetails]    Script Date: 11/15/2019 8:29:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_GetUserFileDetails]

(
	@p_UserID bigint
)

AS
SELECT * FROM [UserFile]

WHERE
UserID = @p_UserID

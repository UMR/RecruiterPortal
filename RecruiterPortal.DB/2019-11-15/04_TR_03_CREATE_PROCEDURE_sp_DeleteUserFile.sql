USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteUserFile]    Script Date: 11/15/2019 2:17:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteUserFile]

(
	@p_UserFileID bigint
)

AS
DELETE FROM [UserFile]

WHERE
UserFileID = @p_UserFileID


/*DROP PROC dbo.sp_DeleteUserFile*/
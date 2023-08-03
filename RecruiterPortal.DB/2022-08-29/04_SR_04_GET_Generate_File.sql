USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetNurseFormByUserID]    Script Date: 8/29/2022 8:55:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetGeneratedFileByUserIdAndFileType]
	 @UserID bigint
	,@FileTypeCode nvarchar(500)
AS
	SET NOCOUNT ON;
	SELECT * FROM dbo.[GeneratedFiles] 
	WHERE UserID = @UserID AND FileTypeCode=@FileTypeCode


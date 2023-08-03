USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateInfluenzaVaccination]    Script Date: 8/29/2022 8:16:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_UpdateGeneratedFile]
(
			 @GeneratedFileID  bigint	
            ,@FileData varbinary
			,@FIleName nvarchar(500)
			,@UpdatedDate nvarchar(500)
			,@TermplateID nvarchar(500)
			,@FileTypeCode nvarchar(500)
)

AS
BEGIN
UPDATE [dbo].[GeneratedFiles]
	SET	 [FileData] = @FileData
		,[FIleName] = @FIleName
		,[UpdatedDate] = @UpdatedDate
		,[TermplateID] = @TermplateID
		,[FileTypeCode] = @FileTypeCode
WHERE [GeneratedFileID] = @GeneratedFileID

END

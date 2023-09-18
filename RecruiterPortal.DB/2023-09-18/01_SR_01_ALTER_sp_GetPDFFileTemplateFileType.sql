USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetPDFFileTemplateFileType]    Script Date: 9/18/2023 5:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_GetPDFFileTemplateFileType]
	 @FileTypeCode nvarchar(500)
AS
	SET NOCOUNT ON;
	SELECT * FROM [dbo].[PDFTemplates]
	WHERE FileTypeCode=@FileTypeCode
USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetPDFFileTemplateFileType]    Script Date: 9/1/2022 5:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetPDFFileTemplateFileType]
	 @FileTypeCode nvarchar(500)
AS
	SET NOCOUNT ON;
	SELECT * FROM [dbo].[View_PDFTemplates]
	WHERE FileTypeCode=@FileTypeCode
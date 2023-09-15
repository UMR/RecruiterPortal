INSERT INTO [UMRRecruitmentApplicant].[dbo].[PDFTemplates]
           ([FileTypeCode]
           ,[FileData]
           ,[FIleName])
   SELECT [FileTypeCode],FileData,[FIleName]  FROM [UMRRecruitementDB_New].[dbo].[PDFTemplates]

INSERT INTO [dbo].[Country]
           ([CountryName]
           ,[Description]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[UpdatedBy]
           ,[UpdatedDate])

SELECT [CountryName],[Description],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate] FROM [UMRRecruitementDB_New].[dbo].[Country]



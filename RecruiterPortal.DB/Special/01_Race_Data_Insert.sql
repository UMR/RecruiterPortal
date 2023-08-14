
INSERT INTO [UMRRecruitmentApplicant].[dbo].[Race]
           ([Race]
           ,[RaceCode]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[UpdatedBy]
           ,[UpdatedDate])

SELECT * FROM [UMRRecruitementDB_New].[dbo].[Race]
     

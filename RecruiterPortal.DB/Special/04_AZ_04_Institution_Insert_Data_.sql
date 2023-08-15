INSERT INTO [UMRRecruitmentApplicant].[dbo].[Institution]
           ([InstituteName]
           ,[IsActive]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[UpdatedBy]
           ,[UpdatedDate])

SELECT InstituteName, IsActive, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate FROM [UMRRecruitementDB_New].[dbo].[Institute]
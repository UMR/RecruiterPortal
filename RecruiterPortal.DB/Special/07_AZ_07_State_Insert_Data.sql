
INSERT INTO [UMRRecruitmentApplicant].[dbo].[State]
		   ([StateId]
           ,[StateCode]
           ,[StateName]
           ,[CountryId]
           ,[Description]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[UpdatedBy]
           ,[UpdatedDate])

SELECT [StateId]
      ,[SateCode]
      ,[StateName]
      ,[CountryId]
      ,[Description]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[UpdatedBy]
      ,[UpdatedDate]
  FROM [UMRRecruitementDB_New].[dbo].[State]
    


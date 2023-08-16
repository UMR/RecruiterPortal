INSERT INTO [UMRRecruitmentApplicant].[dbo].[Position]
           ([PositionName]           
           ,[CreatedBy]
           ,[CreatedDate]
           ,[UpdatedBy]
           ,[UpdatedDate])

SELECT PositionName, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate FROM [UMRRecruitementDB_New].[dbo].[Position]

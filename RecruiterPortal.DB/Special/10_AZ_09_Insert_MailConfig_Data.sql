
INSERT INTO [UMRRecruitmentApplicant].[dbo].[RecruiterMailConfig] 
			([ProfileName]
           ,[RecruiterId]
           ,[Email]
           ,[GoogleRefreshToken]
           ,[GoogleDriveFolderId]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[UpdatedBy]
           ,[UpdatedDate]
           ,[IsGoogleApiError])         

SELECT [ProfileName]
      ,1      
      ,[POP3UserName] AS Email      
      ,[GoogleRefreshToken]
      ,[GoogleDriveFolderId]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[UpdatedBy]
      ,[UpdatedDate]
      ,[IsGoogleApiError]
  FROM [UMRRecruitementDB_New].[dbo].[MailConfiguration]


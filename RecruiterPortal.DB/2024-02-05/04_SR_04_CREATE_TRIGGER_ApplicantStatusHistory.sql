USE [UMRRecruitmentApplicant]
GO
/****** Object:  Trigger [dbo].[ApplicantStatusHistory_History_Data_Insert]    Script Date: 2/5/2024 6:50:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[ApplicantStatusHistory_History_Data_Insert]
       ON [dbo].[ApplicantStatus]
AFTER UPDATE
AS
BEGIN 
 INSERT INTO [dbo].[ApplicantStatusHistory]
           ([ID]
           ,[ApplicantId]
           ,[PositionId]
           ,[InstitutionId]
           ,[AgencyId]
           ,[Status]
           ,[Date]
           ,[TotalFee]
           ,[NetFee]
           ,[RefFee]
           ,[CurrentSalary]
           ,[ExpectedSalary]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[UpdatedBy]
           ,[UpdatedDate]
           ,[ProfileStatus]
           ,[Shift]
           ,[IsActive]
           ,[Notes])
	   SELECT *
        FROM INSERTED
END

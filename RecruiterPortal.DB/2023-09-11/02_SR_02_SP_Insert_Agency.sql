USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertAgency]    Script Date: 9/11/2023 8:46:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_InsertAgency]
(
	@AgencyName nvarchar(100),
	@CreatedBy int,
	@CreatedDate datetime,
	@AgencyAddress nvarchar(200),
	@URLPrefix nvarchar(50),
	@AgencyEmail nvarchar(100),
	@AgencyPhone nvarchar(50),
	@AgencyContactPerson nvarchar(50),
	@AgencyContactPersonPhone nvarchar(50),
	@IsActive nvarchar(50),
	@AgencyLoginId nvarchar(50)
)
AS

SET NOCOUNT OFF;


INSERT INTO [dbo].[Agency]
           ([AgencyName]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[AgencyAddress]
           ,[URLPrefix]
           ,[AgencyEmail]
           ,[AgencyPhone]
           ,[AgencyContactPerson]
           ,[AgencyContactPersonPhone]
           ,[IsActive]
           ,[AgencyLoginId]
		   )
     VALUES
           (@AgencyName
           ,@CreatedBy
           ,@CreatedDate
           ,@AgencyAddress
           ,@URLPrefix
           ,@AgencyEmail
           ,@AgencyPhone
           ,@AgencyContactPerson
           ,@AgencyContactPersonPhone
           ,@IsActive
           ,@AgencyLoginId)
GO



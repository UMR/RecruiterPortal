USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserCBC]    Script Date: 9/7/2021 12:35:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateAgreementForm]
(		     @p_AgreementId bigint 
			,@p_UserID  bigint	
            ,@p_ContractorName nvarchar(500)
			,@p_StreetAddress nvarchar(500)
			,@p_ZipCode nvarchar(500)
			,@p_City nvarchar(500)
			,@p_StateName nvarchar(500)
			,@p_Notary nvarchar(500)
			,@p_Date datetime
)

AS
UPDATE [dbo].[AgreementFrom]
   SET ContractorName = @p_ContractorName
      ,[StreetAddress] = @p_StreetAddress
      ,[ZipCode] = @p_ZipCode
      ,[City] = @p_City
      ,[StateName] = @p_StateName
	  ,[Notary] = @p_Notary
      ,[Date] = @p_Date
      ,[UserID] = @p_UserID
WHERE AgreementID = @p_AgreementId
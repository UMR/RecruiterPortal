USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateAgreementForm]    Script Date: 10/24/2023 12:45:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER   PROCEDURE [dbo].[sp_UpdateAgreementForm]
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
WHERE UserID = @p_UserID
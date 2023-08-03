USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertCBC]    Script Date: 9/7/2021 12:32:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[sp_InsertCBC] 
	-- Add the parameters for the stored procedure here
			@p_UserID  bigint	
           ,@p_Alias_AKA nvarchar (500)
           ,@p_HomePhone nvarchar (500)
           ,@p_AgencyIdentification nvarchar (500)
           ,@p_LTHHP_PFI nvarchar (500)
           ,@p_LHCSA_License nvarchar (500)
           ,@p_AgencyName nvarchar (500)
           ,@p_ATelephoneNo nvarchar (500)
           ,@p_APLastName nvarchar (500)
           ,@p_APFirstName nvarchar (500)
           ,@p_AStreetNo nvarchar (500)
           ,@p_AStreetName nvarchar (500)
           ,@p_AApt nvarchar (500)
           ,@p_ACity nvarchar (500)
           ,@p_AState nvarchar (500)
           ,@p_AZipCode nvarchar (500)
           ,@p_AEmail nvarchar (500)
           ,@p_ADate nvarchar (500)
           ,@p_FingerprintingMethod nvarchar (500)
           ,@p_FingerprintServicesName nvarchar (500)
           ,@p_FStAddress nvarchar (500)
           ,@p_FCity nvarchar (500)
           ,@p_FState nvarchar (500)
           ,@p_FZip nvarchar (500)
           ,@p_FIdentificationVerified nvarchar (500)
           ,@p_FFirstName nvarchar (500)
           ,@p_FLastName nvarchar (500)
           ,@p_FTitle nvarchar (500)
           ,@p_Signature nvarchar (500)
           ,@p_DateFingerPrinted nvarchar (500)
           ,@p_MotherMaidenName nvarchar (500)
           ,@p_ParentorLegalGuardian nvarchar (500)
           ,@p_Title nvarchar (500)
           ,@p_CreatedBy nvarchar (500)
           ,@p_CreatedDate datetime
		   
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
INSERT INTO [dbo].[CBCForm]
( 
			[UserID]
           ,[Alias_AKA]
           ,[HomePhone]
           ,[AgencyIdentification]
           ,[LTHHP_PFI]
           ,[LHCSA_License]
           ,[AgencyName]
           ,[ATelephoneNo]
           ,[APLastName]
           ,[APFirstName]
           ,[AStreetNo]
           ,[AStreetName]
           ,[AApt]
           ,[ACity]
           ,[AState]
           ,[AZipCode]
           ,[AEmail]
           ,[ADate]
           ,[FingerprintingMethod]
           ,[FingerprintServicesName]
           ,[FStAddress]
           ,[FCity]
           ,[FState]
           ,[FZip]
           ,[FIdentificationVerified]
           ,[FFirstName]
           ,[FLastName]
           ,[FTitle]
           ,[Signature]
           ,[DateFingerPrinted]
           ,[MotherMaidenName]
           ,[ParentorLegalGuardian]
           ,[Title]
           ,[CreatedBy]
           ,[CreatedDate]
)
VALUES 
(          @p_UserID 	
		   ,@p_Alias_AKA 
           ,@p_HomePhone 
           ,@p_AgencyIdentification 
           ,@p_LTHHP_PFI 
           ,@p_LHCSA_License 
           ,@p_AgencyName 
           ,@p_ATelephoneNo 
           ,@p_APLastName 
           ,@p_APFirstName 
           ,@p_AStreetNo 
           ,@p_AStreetName 
           ,@p_AApt 
           ,@p_ACity 
           ,@p_AState 
           ,@p_AZipCode 
           ,@p_AEmail 
           ,@p_ADate 
           ,@p_FingerprintingMethod 
           ,@p_FingerprintServicesName 
           ,@p_FStAddress 
           ,@p_FCity 
           ,@p_FState 
           ,@p_FZip 
           ,@p_FIdentificationVerified 
           ,@p_FFirstName 
           ,@p_FLastName 
           ,@p_FTitle 
           ,@p_Signature 
           ,@p_DateFingerPrinted 
           ,@p_MotherMaidenName 
           ,@p_ParentorLegalGuardian 
           ,@p_Title 
           ,@p_CreatedBy 
           ,@p_CreatedDate 
)

END

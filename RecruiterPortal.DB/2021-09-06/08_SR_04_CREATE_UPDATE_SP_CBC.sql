USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserCBC]    Script Date: 9/7/2021 12:35:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateUserCBC]
(		    @p_CBCID  bigint
	       ,@p_UserID  bigint	
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
           ,@p_UpdatedBy nvarchar (500)
           ,@p_UpdatedDate datetime
)

AS
UPDATE [dbo].[CBCForm]
   SET [UserID] = @p_UserID
      ,[Alias_AKA] = @p_Alias_AKA
      ,[HomePhone] = @p_HomePhone
      ,[AgencyIdentification] = @p_AgencyIdentification
      ,[LTHHP_PFI] = @p_LTHHP_PFI
      ,[LHCSA_License] = @p_LHCSA_License
      ,[AgencyName] = @p_AgencyName
      ,[ATelephoneNo] = @p_ATelephoneNo
      ,[APLastName] = @p_APLastName
      ,[APFirstName] = @p_APFirstName
      ,[AStreetNo] = @p_AStreetNo
      ,[AStreetName] = @p_AStreetName
      ,[AApt] = @p_AApt
      ,[ACity] = @p_ACity
      ,[AState] = @p_AState
      ,[AZipCode] = @p_AZipCode
      ,[AEmail] = @p_AEmail
      ,[ADate] = @p_ADate
      ,[FingerprintingMethod] = @p_FingerprintingMethod
      ,[FingerprintServicesName] = @p_FingerprintServicesName
      ,[FStAddress] = @p_FStAddress
      ,[FCity] = @p_FCity
      ,[FState] = @p_FState
      ,[FZip] = @p_FZip
      ,[FIdentificationVerified] = @p_FIdentificationVerified
      ,[FFirstName] = @p_FFirstName
      ,[FLastName] = @p_FLastName
      ,[FTitle] = @p_FTitle
      ,[Signature] = @p_Signature
      ,[DateFingerPrinted] = @p_DateFingerPrinted
      ,[MotherMaidenName] = @p_MotherMaidenName
      ,[ParentorLegalGuardian] = @p_ParentorLegalGuardian
      ,[Title] = @p_Title
      ,[UpdatedBy] = @p_UpdatedBy
      ,[UpdatedDate] = @p_UpdatedDate
WHERE
CBCID = @p_CBCID
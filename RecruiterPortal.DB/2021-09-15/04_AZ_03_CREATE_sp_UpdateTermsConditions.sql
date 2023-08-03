USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateTermsConditions]    Script Date: 9/15/2021 3:07:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE OR ALTER   PROCEDURE [dbo].[sp_UpdateTermsConditions]
(
	@EffectiveDate datetime NULL,	
    @FacilityName nvarchar(500) NULL,
    @StreetAddress nvarchar(500) NULL,
    @ZipCode nvarchar(500) NULL,
    @City nvarchar(500) NULL,
    @StateName nvarchar(500) NULL,
    @OfficePhone nvarchar(500) NULL,
    @Position nvarchar(500) NULL,
    @RatePayCompensation nvarchar(500) NULL,
    @DaysPerWeek int NULL,
    @NameGeneralLiabilityInsurance nvarchar(500) NULL,
    @GeneralLiabilityInsurancePolicyNo nvarchar(500) NULL,
    @NameMalpracticeInsurance nvarchar(500) NULL,
	@MalpracticeInsurancePolicyNo nvarchar(500) NULL,
    @NameWorkersCompensationInsurance nvarchar(500) NULL,
	@WorkersCompensationInsurancePolicyNo nvarchar(500) NULL,
    @NameDisabilityInsurance nvarchar(500) NULL,
    @NameDisabilityInsurancePolicyNo nvarchar(500) NULL,
    @SignatureDate datetime NULL,	
    @AuthorizedBy nvarchar(500) NULL,
    @AuthorizedDate datetime NULL,	
    @UserID bigint,
    @TermsConditionsID bigint
)

AS
BEGIN
UPDATE [dbo].[TermsConditions]
	SET [EffectiveDate] = @EffectiveDate
      ,[FacilityName] = @FacilityName
      ,[StreetAddress] = @StreetAddress
      ,[ZipCode] = @ZipCode
      ,[City] = @City
      ,[StateName] = @StateName
      ,[OfficePhone] = @OfficePhone
      ,[Position] = @Position
      ,[RatePayCompensation] = @RatePayCompensation
      ,[DaysPerWeek] = @DaysPerWeek
      ,[NameGeneralLiabilityInsurance] = @NameGeneralLiabilityInsurance
      ,[GeneralLiabilityInsurancePolicyNo] = @GeneralLiabilityInsurancePolicyNo
      ,[NameMalpracticeInsurance] = @NameMalpracticeInsurance
	  ,[MalpracticeInsurancePolicyNo] = @MalpracticeInsurancePolicyNo
      ,[NameWorkersCompensationInsurance] = @NameWorkersCompensationInsurance
	  ,[WorkersCompensationInsurancePolicyNo] = @WorkersCompensationInsurancePolicyNo
      ,[NameDisabilityInsurance] = @NameDisabilityInsurance
      ,[NameDisabilityInsurancePolicyNo] = @NameDisabilityInsurancePolicyNo
      ,[SignatureDate] = @SignatureDate
      ,[AuthorizedBy] = @AuthorizedBy
      ,[AuthorizedDate] = @AuthorizedDate
      ,[UserID] = @UserID      
WHERE [TermsConditionsID] = @TermsConditionsID

END

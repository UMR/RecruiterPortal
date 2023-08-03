USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertTermsConditions]    Script Date: 9/15/2021 3:01:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE OR ALTER   PROCEDURE [dbo].[sp_InsertTermsConditions]		

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
    @CreatedDate datetime NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
INSERT INTO [dbo].[TermsConditions]
           ([EffectiveDate]
           ,[FacilityName]
           ,[StreetAddress]
           ,[ZipCode]
           ,[City]
           ,[StateName]
           ,[OfficePhone]
           ,[Position]
           ,[RatePayCompensation]
           ,[DaysPerWeek]
           ,[NameGeneralLiabilityInsurance]
           ,[GeneralLiabilityInsurancePolicyNo]
           ,[NameMalpracticeInsurance]
           ,[MalpracticeInsurancePolicyNo]
           ,[NameWorkersCompensationInsurance]
           ,[WorkersCompensationInsurancePolicyNo]
           ,[NameDisabilityInsurance]
           ,[NameDisabilityInsurancePolicyNo]
           ,[SignatureDate]
           ,[AuthorizedBy]
           ,[AuthorizedDate]
           ,[UserID]
           ,[CreatedDate])
     VALUES
           (@EffectiveDate
           ,@FacilityName
           ,@StreetAddress
           ,@ZipCode
           ,@City
           ,@StateName
           ,@OfficePhone
           ,@Position
           ,@RatePayCompensation
           ,@DaysPerWeek
           ,@NameGeneralLiabilityInsurance
           ,@GeneralLiabilityInsurancePolicyNo
           ,@NameMalpracticeInsurance
           ,@MalpracticeInsurancePolicyNo
           ,@NameWorkersCompensationInsurance
           ,@WorkersCompensationInsurancePolicyNo
           ,@NameDisabilityInsurance
           ,@NameDisabilityInsurancePolicyNo
           ,@SignatureDate
           ,@AuthorizedBy
           ,@AuthorizedDate
           ,@UserID
           ,@CreatedDate)
END

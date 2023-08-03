USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateNurseForm]    Script Date: 9/16/2021 3:30:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateNurseForm]
(
	@LicensedJurisdiction bit NULL,
	@FailedRNLicensing bit NULL,
	@FailedPNLicensing bit NULL,
	@CGFNSCNATSCompleted nvarchar(500) NULL,
	@CGFNSExaminationDate datetime NULL,
	@CGFNSCertificateNumber nvarchar(500) NULL,
	@CNATSExaminationDate datetime NULL,
	@CNATSExamScore nvarchar(500) NULL,
	@NursingSchoolAttended nvarchar(500) NULL,
	@NursingSchoolAddress nvarchar(500) NULL,
	@NursingSchoolCompletedDate  datetime NULL,
	@PermitteesName nvarchar(500) NULL,
	@RNLPNEmployed nvarchar(500) NULL,
	@EmployerName nvarchar(500) NULL,
	@EmployerStreetAddress nvarchar(500) NULL,
	@EmployerCity nvarchar(500) NULL,
	@EmployerStateProvince nvarchar(500) NULL,
	@EmployerZipCode nvarchar(500) NULL,
	@EmployerCountry nvarchar(500) NULL,
	@EmployerTelephone nvarchar(500) NULL,
	@EmployerFax nvarchar(500) NULL,
	@EmployerEmail nvarchar(500) NULL,
	@PracticeName nvarchar(500) NULL,
	@PracticeStreetAddress nvarchar(500) NULL,
	@PracticeCity nvarchar(500) NULL,
	@PracticeStateProvince nvarchar(500) NULL,
	@PracticeZipCode nvarchar(500) NULL,
	@PracticeCountry nvarchar(500) NULL,
	@PracticeTelephone nvarchar(500) NULL,
	@PracticeFax nvarchar(500) NULL,
	@PracticeEmail nvarchar(500) NULL,
	@RegisteredProfessionalNurse nvarchar(500) NULL,
	@NewYorkStateLicenseNumber1 nvarchar(500) NULL,
	@NewYorkStateLicenseNumber2 nvarchar(500) NULL,
	@SignatureBehalfEmployer nvarchar(500) NULL,
	@SignatureDate datetime NULL,
	@PrintName nvarchar(500) NULL,
	@Title nvarchar(500) NULL,
	@NewYorkStateProfession nvarchar(500) NULL,
	@NewYorkStateProfessionalLicenseNumber nvarchar(500) NULL,
	@UserID bigint,
	@NurseFormID bigint
)

AS
BEGIN
UPDATE [dbo].[NurseForm]
    SET [LicensedJurisdiction] = @LicensedJurisdiction
      ,[FailedRNLicensing] = @FailedRNLicensing
      ,[FailedPNLicensing] = @FailedPNLicensing
      ,[CGFNSCNATSCompleted] = @CGFNSCNATSCompleted
      ,[CGFNSExaminationDate] = @CGFNSExaminationDate
      ,[CGFNSCertificateNumber] = @CGFNSCertificateNumber
      ,[CNATSExaminationDate] = @CNATSExaminationDate
      ,[CNATSExamScore] = @CNATSExamScore
      ,[NursingSchoolAttended] = @NursingSchoolAttended
      ,[NursingSchoolAddress] = @NursingSchoolAddress
      ,[NursingSchoolCompletedDate] = @NursingSchoolCompletedDate
      ,[PermitteesName] = @PermitteesName
      ,[RNLPNEmployed] = @RNLPNEmployed
      ,[EmployerName] = @EmployerName
      ,[EmployerStreetAddress] = @EmployerStreetAddress
      ,[EmployerCity] = @EmployerCity
      ,[EmployerStateProvince] = @EmployerStateProvince
      ,[EmployerZipCode] = @EmployerZipCode
      ,[EmployerCountry] = @EmployerCountry
      ,[EmployerTelephone] = @EmployerTelephone
      ,[EmployerFax] = @EmployerFax
      ,[EmployerEmail] = @EmployerEmail
      ,[PracticeName] = @PracticeName
      ,[PracticeStreetAddress] = @PracticeStreetAddress
      ,[PracticeCity] = @PracticeCity
      ,[PracticeStateProvince] = @PracticeStateProvince
      ,[PracticeZipCode] = @PracticeZipCode
      ,[PracticeCountry] = @PracticeCountry
      ,[PracticeTelephone] = @PracticeTelephone
      ,[PracticeFax] = @PracticeFax
      ,[PracticeEmail] = @PracticeEmail
      ,[RegisteredProfessionalNurse] = @RegisteredProfessionalNurse
      ,[NewYorkStateLicenseNumber1] = @NewYorkStateLicenseNumber1
      ,[NewYorkStateLicenseNumber2] = @NewYorkStateLicenseNumber2
      ,[SignatureBehalfEmployer] = @SignatureBehalfEmployer
      ,[SignatureDate] = @SignatureDate
      ,[PrintName] = @PrintName
      ,[Title] = @Title
      ,[NewYorkStateProfession] = @NewYorkStateProfession
      ,[NewYorkStateProfessionalLicenseNumber] = @NewYorkStateProfessionalLicenseNumber
      ,[UserID] = @UserID
WHERE [NurseFormID] = @NurseFormID

END

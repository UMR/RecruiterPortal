USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[NurseForm]    Script Date: 9/6/2021 2:58:53 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[NurseForm](
	[NurseFormID] [bigint] IDENTITY(1,1) NOT NULL,
	[LicensedJurisdiction] [bit] NULL,
	[FailedRNLicensing] [bit] NULL,
	[FailedPNLicensing] [bit] NULL,
	[CGFNSCNATSCompleted] [nvarchar](500) NULL,
	[CGFNSExaminationDate] [datetime] NULL,
	[CGFNSCertificateNumber] [nvarchar](500) NULL,
	[CNATSExaminationDate] [datetime] NULL,
	[CNATSExamScore] [nvarchar](500) NULL,
	[NursingSchoolAttended] [nvarchar](500) NULL,
	[NursingSchoolAddress] [nvarchar](500) NULL,
	[NursingSchoolCompletedDate] [nvarchar](500) NULL,
	[PermitteesName] [nvarchar](500) NULL,
	[RNLPNEmployed] [nvarchar](500) NULL,
	[EmployerName] [nvarchar](500) NULL,
	[EmployerStreetAddress] [nvarchar](500) NULL,
	[EmployerCity] [nvarchar](500) NULL,
	[EmployerStateProvince] [nvarchar](500) NULL,
	[EmployerZipCode] [nvarchar](500) NULL,
	[EmployerCountry] [nvarchar](500) NULL,
	[EmployerTelephone] [nvarchar](500) NULL,
	[EmployerFax] [nvarchar](500) NULL,
	[EmployerEmail] [nvarchar](500) NULL,
	[PracticeName] [nvarchar](500) NULL,
	[PracticeStreetAddress] [nvarchar](500) NULL,
	[PracticeCity] [nvarchar](500) NULL,
	[PracticeStateProvince] [nvarchar](500) NULL,
	[PracticeZipCode] [nvarchar](500) NULL,
	[PracticeCountry] [nvarchar](500) NULL,
	[PracticeTelephone] [nvarchar](500) NULL,
	[PracticeFax] [nvarchar](500) NULL,
	[PracticeEmail] [nvarchar](500) NULL,
	[RegisteredProfessionalNurse] [nvarchar](500) NULL,
	[NewYorkStateLicenseNumber1] [nvarchar](500) NULL,
	[NewYorkStateLicenseNumber2] [nvarchar](500) NULL,
	[SignatureBehalfEmployer] [nvarchar](500) NULL,
	[SignatureDate] [nvarchar](500) NULL,
	[PrintName] [nvarchar](500) NULL,
	[Title] [nvarchar](500) NULL,
	[NewYorkStateProfession] [nvarchar](500) NULL,
	[NewYorkStateProfessionalLicenseNumber] [nvarchar](500) NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_NurseForm] PRIMARY KEY CLUSTERED 
(
	[NurseFormID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[NurseForm]  WITH CHECK ADD  CONSTRAINT [FK_NurseForm_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[NurseForm] CHECK CONSTRAINT [FK_NurseForm_UserID]
GO



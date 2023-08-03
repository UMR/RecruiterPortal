USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[TermsConditions]    Script Date: 9/14/2021 12:45:58 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TermsConditions](
	[TermsConditionsID] [bigint] IDENTITY(1,1) NOT NULL,
	[EffectiveDate] [datetime] NULL,
	[FacilityName] [nvarchar](500) NULL,
	[StreetAddress] [nvarchar](500) NULL,
	[ZipCode] [nvarchar](500) NULL,
	[City] [nvarchar](500) NULL,
	[StateName] [nvarchar](500) NULL,
	[OfficePhone] [nvarchar](500) NULL,
	[Position] [nvarchar](500) NULL,
	[RatePayCompensation] [nvarchar](500) NULL,
	[DaysPerWeek] [tinyint] NULL,
	[NameGeneralLiabilityInsurance] [nvarchar](500) NULL,
	[GeneralLiabilityInsurancePolicyNo] [nvarchar](500) NULL,
	[NameMalpracticeInsurance] [nvarchar](500) NULL,
	[MalpracticeInsurancePolicyNo] [nvarchar](500) NULL,
	[NameWorkersCompensationInsurance] [nvarchar](500) NULL,
	[WorkersCompensationInsurancePolicyNo] [nvarchar](500) NULL,
	[NameDisabilityInsurance] [nvarchar](500) NULL,
	[NameDisabilityInsurancePolicyNo] [nvarchar](500) NULL,
	[SignatureDate] [datetime] NULL,
	[AuthorizedBy] [nvarchar](500) NULL,
	[AuthorizedDate] [datetime] NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_TermsConditions] PRIMARY KEY CLUSTERED 
(
	[TermsConditionsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TermsConditions]  WITH CHECK ADD  CONSTRAINT [FK_TermsConditions_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[TermsConditions] CHECK CONSTRAINT [FK_TermsConditions_UserID]
GO



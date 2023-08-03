USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[USCIS]    Script Date: 9/7/2021 7:32:58 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[USCIS](
	[USCISID] [bigint] IDENTITY(1,1) NOT NULL,
	[USCISNumber] [nvarchar](500) NULL,
	[WorkAuthExpiryDate] [datetime] NULL,
	[I94AdmissionNumber] [datetime] NULL,
	[ForeignPassort] [nvarchar](500) NULL,
	[TranslatorFirstName] [nvarchar](500) NULL,
	[TranslatorLastName] [nvarchar](500) NULL,
	[StreetAddress] [nvarchar](500) NULL,
	[Apt] [nvarchar](50) NULL,
	[ZipCode] [nvarchar](50) NULL,
	[City] [nvarchar](50) NULL,
	[StateName] [nvarchar](50) NULL,
	[AdditionalInformation] [nvarchar](1000) NULL,
	[EmploymentDate] [datetime] NULL,
	[DocumentTitle] [nvarchar](500) NULL,
	[DocumentNumber] [nvarchar](500) NULL,
	[ExpirationDate] [datetime] NULL,
	[UserID] [bigint] NOT NULL,
 CONSTRAINT [PK_USCIS] PRIMARY KEY CLUSTERED 
(
	[USCISID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[USCIS]  WITH CHECK ADD  CONSTRAINT [FK_USCIS_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[USCIS] CHECK CONSTRAINT [FK_USCIS_User]
GO



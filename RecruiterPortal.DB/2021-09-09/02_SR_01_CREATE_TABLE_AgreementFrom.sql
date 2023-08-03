USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[USCIS]    Script Date: 9/9/2021 12:51:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AgreementFrom](
	[AgreementID] [bigint] IDENTITY(1,1) NOT NULL,
	[ContractorName] [nvarchar](500) NULL,
	[StreetAddress] [nvarchar](500) NULL,
	[ZipCode] [nvarchar](50) NULL,
	[City] [nvarchar](500) NULL,
	[StateName] [nvarchar](50) NULL,
	[Notary] [nvarchar](500) NULL,
	[Date] [datetime] NULL,
	[UserID] [bigint] NOT NULL,
 CONSTRAINT [PK_AGREEMENT] PRIMARY KEY CLUSTERED 
(
	[AgreementID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AgreementFrom]  WITH CHECK ADD  CONSTRAINT [FK_AGREEMENT_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[AgreementFrom] CHECK CONSTRAINT [FK_Agreement_User]
GO
USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[USCIS]    Script Date: 9/9/2021 12:51:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[W9From](
	[WID] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[BusinessName] [nvarchar](500) NULL,
	[CompanyLiability] [bit] NULL,
	[IndividualProprietor] [bit] NULL,
	[CCorporation] [bit] NULL,
	[SCorporation] [bit] NULL,
	[Partnership] [bit] NULL,
	[PayeeCode] [nvarchar](500) NULL,
	[ReportingCode] [nvarchar](500) NULL,
	[StreetAddress] [nvarchar](500) NULL,
	[AptNo] [nvarchar](100) NULL,
	[ZipCode] [nvarchar](50) NULL,
	[City] [nvarchar](500) NULL,
	[StateName] [nvarchar](50) NULL,
	[AccountNumber] [nvarchar](500) NULL,
	[RequesterNameAddress] [nvarchar](500) NULL,
	[SSN] [nvarchar](500) NULL,
	[EmployerIdNo] [nvarchar](500) NULL,
	[Date] [datetime] NULL,
	[UserID] [bigint] NOT NULL,
 CONSTRAINT [PK_W9FORM] PRIMARY KEY CLUSTERED 
(
	[WID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[W9From]  WITH CHECK ADD  CONSTRAINT [FK_W9FORM_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[W9From] CHECK CONSTRAINT [FK_W9FORM_User]
GO
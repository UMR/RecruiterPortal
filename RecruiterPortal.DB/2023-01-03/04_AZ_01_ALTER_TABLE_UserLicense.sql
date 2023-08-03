USE [UMRRecruitmentApplicant]
GO

ALTER TABLE [dbo].[UserLicense] DROP CONSTRAINT [FK_UserLicense_User]
GO

ALTER TABLE [dbo].[UserLicense] DROP CONSTRAINT [DF_License_CreatedDate]
GO

/****** Object:  Table [dbo].[UserLicense]    Script Date: 1/3/2023 8:16:11 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserLicense]') AND type in (N'U'))
DROP TABLE [dbo].[UserLicense]
GO

/****** Object:  Table [dbo].[UserLicense]    Script Date: 1/3/2023 8:16:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserLicense](
	[LicenseID] [bigint] IDENTITY(1,1) NOT NULL,
	[LicenseNameA] [nvarchar](200) NULL,
	[LicenseNameB] [nvarchar](200) NULL,
	[LicenseNameC] [nvarchar](200) NULL,
	[LicenseNo] [nvarchar](50) NULL,
	[ExpiryDate] [datetime] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UserID] [bigint] NOT NULL,
	[FIleData] [varbinary](max) NULL,
	[FileName] [nvarchar](512) NULL,
	[IssuedDate] [datetime] NULL,
	[FileType] [tinyint] NULL,
	[IssueAuthority] [varchar](100) NULL,
	[StateCode] [char](3) NULL,
 CONSTRAINT [PK_License] PRIMARY KEY CLUSTERED 
(
	[LicenseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserLicense] ADD  CONSTRAINT [DF_License_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserLicense]  WITH CHECK ADD  CONSTRAINT [FK_UserLicense_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserLicense] CHECK CONSTRAINT [FK_UserLicense_User]
GO



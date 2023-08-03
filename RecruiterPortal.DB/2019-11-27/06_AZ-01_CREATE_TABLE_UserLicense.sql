USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserLicense]    Script Date: 27-Nov-19 6:23:18 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserLicense](
	[LicenseID] [bigint] IDENTITY(1,1) NOT NULL,
	[LicenseName] [nvarchar](200) NOT NULL,
	[LicenseNo] [nvarchar](50) NULL,
	[ExpiryDate] [datetime] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UserID] [bigint] NOT NULL,
 CONSTRAINT [PK_License] PRIMARY KEY CLUSTERED 
(
	[LicenseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[UserLicense] ADD  CONSTRAINT [DF_License_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserLicense]  WITH CHECK ADD  CONSTRAINT [FK_UserLicense_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserLicense] CHECK CONSTRAINT [FK_UserLicense_User]
GO



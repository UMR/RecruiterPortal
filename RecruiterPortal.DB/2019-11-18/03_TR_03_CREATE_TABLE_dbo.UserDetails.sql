USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserDetails]    Script Date: 11/18/2019 12:32:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserDetails](
	[UserDetailsID] [bigint] NOT NULL,
	[StreetAddress] [nvarchar](500) NOT NULL,
	[Apt] [nvarchar](50) NOT NULL,
	[ZipCode] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](50) NOT NULL,
	[SSN] [nvarchar](10) NOT NULL,
	[DateAvailable] [datetime] NOT NULL,
	[DesiredSalary] [nvarchar](200) NOT NULL,
	[DesiredPositionId] [int] NOT NULL,
	[IsUSCitizen] [bit] NOT NULL,
	[IsAuthorized] [bit] NOT NULL,
	[IsOldClient] [bit] NOT NULL,
	[IsConvict] [bit] NOT NULL,
	[ConvictionDetail] [nvarchar](500) NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_UserDetails] PRIMARY KEY CLUSTERED 
(
	[UserDetailsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserDetails] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserDetails]  WITH CHECK ADD  CONSTRAINT [FK_UserDetails_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserDetails] CHECK CONSTRAINT [FK_UserDetails_User]
GO



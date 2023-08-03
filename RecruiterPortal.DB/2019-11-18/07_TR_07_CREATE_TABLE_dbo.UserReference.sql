USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserReference]    Script Date: 11/18/2019 12:36:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserReference](
	[UserReferenceID] [bigint] NOT NULL,
	[RefLastName] [nvarchar](30) NULL,
	[RefFirstName] [nvarchar](30) NOT NULL,
	[RefMiddleName] [nvarchar](30) NULL,
	[NatureOfRelationship] [nvarchar](50) NOT NULL,
	[CompanyName] [nvarchar](500) NOT NULL,
	[EMInstituteID] [bigint] NULL,
	[RefPhone] [nvarchar](50) NULL,
	[RefAddress] [nvarchar](500) NOT NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_UserReference] PRIMARY KEY CLUSTERED 
(
	[UserReferenceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserReference] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserReference]  WITH CHECK ADD  CONSTRAINT [FK_UserReference_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserReference] CHECK CONSTRAINT [FK_UserReference_User]
GO



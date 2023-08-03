USE [UMRRecruitmentApplicant]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserSocial](
	[SocialId] [bigint] IDENTITY(1,1) NOT NULL,
	[Linkedin] [nvarchar] (1000) NULL,
	[Twitter] [nvarchar] (1000) NULL,
	[FaceBook] [nvarchar] (1000) NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NOT NULL
 CONSTRAINT [PK_UserSocial] PRIMARY KEY CLUSTERED 
(
	[SocialId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserSocial] ADD  CONSTRAINT [DF__UserSocial_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserSocial]  WITH CHECK ADD  CONSTRAINT [FK_UserSocial_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserSocial] CHECK CONSTRAINT [FK_UserSocial_User]
GO



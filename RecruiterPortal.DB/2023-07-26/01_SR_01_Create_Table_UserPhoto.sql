USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserPhoto]    Script Date: 7/26/2023 12:46:52 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserPhoto](
	[PhotoId] [bigint] IDENTITY(1,1) NOT NULL,
	[Photo] [varbinary](max) NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL
 CONSTRAINT [PK_UserPhoto] PRIMARY KEY CLUSTERED 
(
	[PhotoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserPhoto] ADD  CONSTRAINT [DF__UserPhoto__Creat__6166761E]  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserPhoto]  WITH CHECK ADD  CONSTRAINT [FK_UserPhoto_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserPhoto] CHECK CONSTRAINT [FK_UserPhoto_User]
GO



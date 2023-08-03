USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserMilitary]    Script Date: 11/18/2019 12:35:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserMilitary](
	[UserMilitaryID] [bigint] NOT NULL,
	[Branch] [nvarchar](500) NOT NULL,
	[FromDate] [datetime] NOT NULL,
	[ToDate] [datetime] NULL,
	[RankAtDischarge] [nvarchar](150) NOT NULL,
	[TypeOfDischarge] [bit] NOT NULL,
	[DisonourComment] [nvarchar](500) NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_UserMilitary] PRIMARY KEY CLUSTERED 
(
	[UserMilitaryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserMilitary] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserMilitary]  WITH CHECK ADD  CONSTRAINT [FK_UserMilitary_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserMilitary] CHECK CONSTRAINT [FK_UserMilitary_User]
GO



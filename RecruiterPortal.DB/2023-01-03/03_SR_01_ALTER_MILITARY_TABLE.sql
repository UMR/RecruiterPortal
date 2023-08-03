USE [UMRRecruitmentApplicant]
GO

ALTER TABLE [dbo].[UserMilitary] DROP CONSTRAINT [FK_UserMilitary_User]
GO

ALTER TABLE [dbo].[UserMilitary] DROP CONSTRAINT [DF__UserMilit__Creat__65370702]
GO

/****** Object:  Table [dbo].[UserMilitary]    Script Date: 1/3/2023 6:18:44 PM ******/
DROP TABLE [dbo].[UserMilitary]
GO

/****** Object:  Table [dbo].[UserMilitary]    Script Date: 1/3/2023 6:18:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserMilitary](
	[UserMilitaryID] [bigint] IDENTITY(1,1) NOT NULL,
	[Branch] [nvarchar](500)  NULL,
	[FromDate] [datetime] NULL,
	[ToDate] [datetime] NULL,
	[RankAtDischarge] [nvarchar](150)  NULL,
	[TypeOfDischarge] [bit] NULL,
	[DisonourComment] [nvarchar](500) NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_UserMilitary] PRIMARY KEY CLUSTERED 
(
	[UserMilitaryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserMilitary] ADD  CONSTRAINT [DF__UserMilit__Creat__65370702]  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserMilitary]  WITH CHECK ADD  CONSTRAINT [FK_UserMilitary_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserMilitary] CHECK CONSTRAINT [FK_UserMilitary_User]
GO



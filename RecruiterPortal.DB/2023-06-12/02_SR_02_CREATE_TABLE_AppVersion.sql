USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[User]    Script Date: 6/14/2023 1:43:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AppVersion](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CurrenctVersion] [nvarchar](30) NULL,
	[OldVersion] [nvarchar](30) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_VersionName] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY])


USE [UMRRecruitmentApplicant]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RecruiterMailConfig](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProfileName] [nvarchar](200) NOT NULL,
	[RecruiterId] [int] NOT NULL,
	[Email] [varchar](200) NULL,	
	[GoogleRefreshToken] [varchar](500) NULL,
	[GoogleDriveFolderId] [nvarchar](128) NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[IsGoogleApiError] [bit] NULL
 CONSTRAINT [PK_RecruiterMailConfig] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


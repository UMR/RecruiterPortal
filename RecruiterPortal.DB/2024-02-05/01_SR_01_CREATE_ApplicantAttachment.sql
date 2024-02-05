USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[ApplicantAttachment]    Script Date: 2/5/2024 4:12:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ApplicantAttachment](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ApplicantID] [int] NOT NULL,
	[Title] [nvarchar](200) NOT NULL,
	[Type] [smallint] NOT NULL,
	[FileName] [nvarchar](100) NOT NULL,
	[FileData] [varbinary](max) NOT NULL,
	[ResumeStatus] [smallint] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UserFileID] [bigint] NULL,
 CONSTRAINT [PK_ApplicantAttachment] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
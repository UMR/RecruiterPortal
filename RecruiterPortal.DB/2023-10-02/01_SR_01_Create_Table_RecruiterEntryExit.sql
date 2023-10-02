USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[RecruiterEntryExit]    Script Date: 10/2/2023 2:12:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RecruiterEntryExit](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[RecruiterId] [int] NOT NULL,
	[LogInTime] [datetime] NOT NULL,
	[LogOutTime] [datetime] NULL 
	CONSTRAINT [PK_RecruiterEntryExit] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[RecruiterEntryExit]  WITH CHECK ADD  CONSTRAINT [FK_RecruiterEntryExit_Users] FOREIGN KEY([RecruiterId])
REFERENCES [dbo].[Recruiter] ([RecruiterId])
GO




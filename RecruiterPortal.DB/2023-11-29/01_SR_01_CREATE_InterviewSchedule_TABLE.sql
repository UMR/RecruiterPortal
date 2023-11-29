USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[InterviewSchedule]    Script Date: 11/29/2023 2:11:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[InterviewSchedule](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[RecruiterId] [int] NOT NULL,
	[Title] [nvarchar](100) NULL,
	[Description] [nvarchar](500) NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_InterviewSchedule] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[InterviewSchedule]  WITH CHECK ADD  CONSTRAINT [FK_InterviewSchedule_Recruter] FOREIGN KEY([RecruiterId])
REFERENCES [dbo].[Recruiter] ([RecruiterId])
GO

ALTER TABLE [dbo].[InterviewSchedule] CHECK CONSTRAINT [FK_InterviewSchedule_Recruter]
GO



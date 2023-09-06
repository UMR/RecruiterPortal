USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[Job]    Script Date: 9/6/2023 6:53:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Job](
	[JobId] [int] IDENTITY(1,1) NOT NULL,
	[Status] [bit] NULL,
	[JobTitle] [nvarchar](500) NULL,
	[JobDescription] [nvarchar](max) NULL,
	[PositionId] [int] NULL,
	[InstituteId] [int] NULL,
	[AgencyId] [bigint] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_Job] PRIMARY KEY CLUSTERED 
(
	[JobId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Job]  WITH CHECK ADD  CONSTRAINT [FK_Job_Agency] FOREIGN KEY([AgencyId])
REFERENCES [dbo].[Agency] ([AgencyId])
GO

ALTER TABLE [dbo].[Job] CHECK CONSTRAINT [FK_Job_Agency]
GO

ALTER TABLE [dbo].[Job]  WITH CHECK ADD  CONSTRAINT [FK_Job_Recruiter] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Recruiter] ([UserID])
GO

ALTER TABLE [dbo].[Job] CHECK CONSTRAINT [FK_Job_Recruiter]
GO

ALTER TABLE [dbo].[Job]  WITH CHECK ADD  CONSTRAINT [FK_Job_Recruiter1] FOREIGN KEY([UpdatedBy])
REFERENCES [dbo].[Recruiter] ([UserID])
GO

ALTER TABLE [dbo].[Job] CHECK CONSTRAINT [FK_Job_Recruiter1]
GO



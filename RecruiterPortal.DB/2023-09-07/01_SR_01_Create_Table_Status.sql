USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[ApplicantStatus]    Script Date: 9/7/2023 5:39:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ApplicantStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ApplicantId] [bigint] NOT NULL,
	[InstitutionId] [int] NULL,
	[PositionId] [int] NULL,
	[Status] [tinyint] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[StatusCreatedDate] [datetime] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_ApplicantStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ApplicantStatus]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantStatus_ApplicantId] FOREIGN KEY([ApplicantId])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[ApplicantStatus] CHECK CONSTRAINT [FK_ApplicantStatus_ApplicantId]
GO

ALTER TABLE [dbo].[ApplicantStatus]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantStatus_InstitutionId] FOREIGN KEY([InstitutionId])
REFERENCES [dbo].[Institution] ([Id])
GO

ALTER TABLE [dbo].[ApplicantStatus] CHECK CONSTRAINT [FK_ApplicantStatus_InstitutionId]
GO

ALTER TABLE [dbo].[ApplicantStatus]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantStatus_PositionId] FOREIGN KEY([PositionId])
REFERENCES [dbo].[Position] ([Id])
GO

ALTER TABLE [dbo].[ApplicantStatus] CHECK CONSTRAINT [FK_ApplicantStatus_PositionId]
GO



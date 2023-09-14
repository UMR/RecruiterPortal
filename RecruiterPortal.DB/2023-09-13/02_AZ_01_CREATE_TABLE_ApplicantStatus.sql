USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[ApplicantStatus]    Script Date: 9/14/2023 7:22:27 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ApplicantStatus](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[ApplicantId] [bigint] NOT NULL,
	[PositionId] [int] NULL,
	[InstitutionId] [int] NULL,
	[AgencyId] [bigint] NOT NULL,
	[Status] [tinyint] NOT NULL,
	[Date] [datetime] NULL,
	[TotalFee] [float] NULL,
	[NetFee] [float] NULL,
	[RefFee] [float] NULL,
	[CurrentSalary] [decimal](10, 2) NULL,
	[ExpectedSalary] [decimal](10, 2) NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[ProfileStatus] [tinyint] NULL,
	[Shift] [varchar](50) NULL,
 CONSTRAINT [PK_ApplicantInstitutionStatus] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ApplicantStatus]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantStatus_Agency] FOREIGN KEY([AgencyId])
REFERENCES [dbo].[Agency] ([AgencyId])
GO

ALTER TABLE [dbo].[ApplicantStatus] CHECK CONSTRAINT [FK_ApplicantStatus_Agency]
GO

ALTER TABLE [dbo].[ApplicantStatus]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantStatus_Institution] FOREIGN KEY([InstitutionId])
REFERENCES [dbo].[Institution] ([Id])
GO

ALTER TABLE [dbo].[ApplicantStatus] CHECK CONSTRAINT [FK_ApplicantStatus_Institution]
GO

ALTER TABLE [dbo].[ApplicantStatus]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantStatus_Position] FOREIGN KEY([PositionId])
REFERENCES [dbo].[Position] ([Id])
GO

ALTER TABLE [dbo].[ApplicantStatus] CHECK CONSTRAINT [FK_ApplicantStatus_Position]
GO

ALTER TABLE [dbo].[ApplicantStatus]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantStatus_Recruiter] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Recruiter] ([RecruiterID])
GO

ALTER TABLE [dbo].[ApplicantStatus] CHECK CONSTRAINT [FK_ApplicantStatus_Recruiter]
GO

ALTER TABLE [dbo].[ApplicantStatus]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantStatus_Recruiter1] FOREIGN KEY([UpdatedBy])
REFERENCES [dbo].[Recruiter] ([RecruiterID])
GO

ALTER TABLE [dbo].[ApplicantStatus] CHECK CONSTRAINT [FK_ApplicantStatus_Recruiter1]
GO

ALTER TABLE [dbo].[ApplicantStatus]  WITH CHECK ADD  CONSTRAINT [FK_ApplicantStatus_User] FOREIGN KEY([ApplicantId])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[ApplicantStatus] CHECK CONSTRAINT [FK_ApplicantStatus_User]
GO



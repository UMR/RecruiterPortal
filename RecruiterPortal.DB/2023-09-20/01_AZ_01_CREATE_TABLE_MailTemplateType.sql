USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[MailTemplateType]    Script Date: 9/20/2023 6:55:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MailTemplateType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_MailTemplateType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[MailTemplateType]  WITH CHECK ADD  CONSTRAINT [FK_MailTemplateType_Recruiter] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Recruiter] ([RecruiterID])
GO

ALTER TABLE [dbo].[MailTemplateType] CHECK CONSTRAINT [FK_MailTemplateType_Recruiter]
GO

ALTER TABLE [dbo].[MailTemplateType]  WITH CHECK ADD  CONSTRAINT [FK_MailTemplateType_Recruiter1] FOREIGN KEY([UpdatedBy])
REFERENCES [dbo].[Recruiter] ([RecruiterID])
GO

ALTER TABLE [dbo].[MailTemplateType] CHECK CONSTRAINT [FK_MailTemplateType_Recruiter1]
GO



USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[SMSLog]    Script Date: 12/4/2023 12:42:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SMSLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[SendTime] [datetime] NOT NULL,
	[FromNumber] [nvarchar](30) NOT NULL,
	[ToNumber] [nvarchar](30) NOT NULL,
	[SMSBody] [nvarchar](max) NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_SMSLog] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[SMSLog]  WITH CHECK ADD  CONSTRAINT [FK_SMS_Recruiter_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Recruiter] ([RecruiterId])
GO

ALTER TABLE [dbo].[SMSLog] CHECK CONSTRAINT [FK_SMS_Recruiter_CreatedBy]
GO

ALTER TABLE [dbo].[SMSLog]  WITH CHECK ADD  CONSTRAINT [FK_SMS_Recruiter_UpdatedBy] FOREIGN KEY([UpdatedBy])
REFERENCES [dbo].[Recruiter] ([RecruiterId])
GO

ALTER TABLE [dbo].[SMSLog] CHECK CONSTRAINT [FK_SMS_Recruiter_UpdatedBy]
GO
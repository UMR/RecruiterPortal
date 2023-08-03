USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserEducation]    Script Date: 11/18/2019 12:32:32 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserEducation](
	[UserEducationID] [bit] NOT NULL,
	[SchoolName] [nvarchar](500) NOT NULL,
	[SchoolAddress] [nvarchar](500) NOT NULL,
	[Degree] [nvarchar](500) NOT NULL,
	[FromDate] [datetime] NOT NULL,
	[ToDate] [datetime] NOT NULL,
	[IsGraduate] [bit] NOT NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_UserEducation] PRIMARY KEY CLUSTERED 
(
	[UserEducationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserEducation] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserEducation]  WITH CHECK ADD  CONSTRAINT [FK_UserEducation_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserEducation] CHECK CONSTRAINT [FK_UserEducation_User]
GO



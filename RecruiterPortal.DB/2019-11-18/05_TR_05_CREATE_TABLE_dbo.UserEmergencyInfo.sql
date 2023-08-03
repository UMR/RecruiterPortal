USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserEmergencyInfo]    Script Date: 11/18/2019 12:32:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserEmergencyInfo](
	[UserEmergencyInfoID] [bigint] NOT NULL,
	[EmrLastName] [nvarchar](30) NOT NULL,
	[EmrFirstName] [nvarchar](30) NOT NULL,
	[NatureOfRelationship] [nvarchar](50) NOT NULL,
	[EmrPhone] [nvarchar](50) NOT NULL,
	[PhoneType] [nvarchar](15) NOT NULL,
	[EmrType] [tinyint] NOT NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_UserEmergencyInfo] PRIMARY KEY CLUSTERED 
(
	[UserEmergencyInfoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserEmergencyInfo] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserEmergencyInfo]  WITH CHECK ADD  CONSTRAINT [FK_UserEmergencyInfo_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserEmergencyInfo] CHECK CONSTRAINT [FK_UserEmergencyInfo_User]
GO



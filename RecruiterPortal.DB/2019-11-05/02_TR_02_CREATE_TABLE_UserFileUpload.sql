USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserFile]    Script Date: 07-Nov-19 1:45:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[UserFile](
	[UserFileID] [bigint] NOT NULL,
	[FIleData] [varbinary](max) NOT NULL,
	[FileName] [nvarchar](max) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UserID] [bigint] NOT NULL,
 CONSTRAINT [PK_UserFiles] PRIMARY KEY CLUSTERED 
(
	[UserFileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[UserFile]  WITH CHECK ADD  CONSTRAINT [FK_UserFiles_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserFile] CHECK CONSTRAINT [FK_UserFiles_User]
GO



USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserRecruiterComment]    Script Date: 07-Nov-19 1:45:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserRecruiterComment](
	[UserRecruiterCommentID] [bigint] NOT NULL,
	[Comment] [nvarchar](max) NOT NULL,
	[CommentDate] [datetime] NOT NULL,
	[UserID] [bigint] NOT NULL,
	[RecruiterName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_UserRecruiterComment] PRIMARY KEY CLUSTERED 
(
	[UserRecruiterCommentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[UserRecruiterComment]  WITH CHECK ADD  CONSTRAINT [FK_UserRecruiterComment_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserRecruiterComment] CHECK CONSTRAINT [FK_UserRecruiterComment_User]
GO



USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserVerification]    Script Date: 07-Nov-19 1:45:31 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserVerification](
	[UserVerificationID] [bigint] NOT NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ExpiryDate] [datetime] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_UserVerification] PRIMARY KEY CLUSTERED 
(
	[UserVerificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[UserVerification]  WITH CHECK ADD  CONSTRAINT [FK_UserVerification_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserVerification] CHECK CONSTRAINT [FK_UserVerification_User]
GO



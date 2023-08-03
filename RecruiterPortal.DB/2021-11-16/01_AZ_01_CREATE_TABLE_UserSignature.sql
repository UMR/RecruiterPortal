USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserSignature]    Script Date: 11/16/2021 11:52:18 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserSignature](
	[UserSignatureID] [bigint] IDENTITY(1,1) NOT NULL,
	[SignatureName] [nvarchar](500) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UserID] [bigint] NOT NULL,
 CONSTRAINT [PK_UserSignature] PRIMARY KEY CLUSTERED 
(
	[UserSignatureID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserSignature] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserSignature]  WITH CHECK ADD  CONSTRAINT [FK_UserSignature_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserSignature] CHECK CONSTRAINT [FK_UserSignature_User]
GO



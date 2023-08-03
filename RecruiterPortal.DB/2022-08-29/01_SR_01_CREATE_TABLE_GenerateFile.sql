USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[GeneratedFiles]    Script Date: 8/29/2022 5:33:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GeneratedFiles](
	[GeneratedFileID] [bigint] IDENTITY(1,1) NOT NULL,
	[UserID] [bigint] NOT NULL,
	[FileData] [varbinary](max) NULL,
	[FIleName] [nvarchar](150) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL,
	[TermplateID] [bigint] NOT NULL,
	[FileTypeCode] [nvarchar](50) NULL,
 CONSTRAINT [PK_GeneratedFiles] PRIMARY KEY CLUSTERED 
(
	[GeneratedFileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[GeneratedFiles]  WITH CHECK ADD  CONSTRAINT [FK_GeneratedFiles_GeneratedFiles] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[GeneratedFiles] CHECK CONSTRAINT [FK_GeneratedFiles_GeneratedFiles]
GO




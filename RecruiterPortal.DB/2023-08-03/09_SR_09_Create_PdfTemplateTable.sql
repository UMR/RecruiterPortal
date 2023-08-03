USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[PDFTemplates]    Script Date: 8/3/2023 8:11:12 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PDFTemplates](
	[TermplateID] [bigint] IDENTITY(1,1) NOT NULL,
	[FileTypeCode] [nvarchar](50) NULL,
	[FileData] [varbinary](max) NULL,
	[FIleName] [nvarchar](150) NULL,
 CONSTRAINT [PK_PDFTemplates] PRIMARY KEY CLUSTERED 
(
	[TermplateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
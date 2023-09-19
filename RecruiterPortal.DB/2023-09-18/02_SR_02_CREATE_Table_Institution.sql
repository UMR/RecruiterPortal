USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[Institution]    Script Date: 9/19/2023 4:26:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Institution](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InstituteName] [nvarchar](250) NOT NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[Address] [nvarchar](200) NULL,
	[Town] [nvarchar](50) NULL,
	[County] [nvarchar](50) NULL,
	[ZipCode] [nchar](10) NULL,
	[CountryId] [int] NULL,
	[StateId] [int] NULL,
	[Telephone] [nvarchar](50) NULL,
	[Website] [nvarchar](200) NULL,
 CONSTRAINT [PK_Institution] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO



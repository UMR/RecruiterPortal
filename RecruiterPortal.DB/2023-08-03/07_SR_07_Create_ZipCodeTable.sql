USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[Lookup_ZipCode]    Script Date: 8/3/2023 8:05:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Lookup_ZipCode](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ZipCode] [nvarchar](50) NOT NULL,
	[City] [nvarchar](50) NOT NULL,
	[StateAbbr] [nvarchar](50) NOT NULL,
	[County] [nvarchar](50) NOT NULL,
	[type] [nvarchar](255) NULL,
	[acceptable_cities] [nvarchar](255) NULL,
	[unacceptable_cities] [nvarchar](255) NULL,
	[timezone] [nvarchar](255) NULL,
	[area_codes] [float] NULL,
	[latitude] [float] NULL,
	[longitude] [float] NULL,
	[world_region] [nvarchar](255) NULL,
	[country] [nvarchar](255) NULL,
	[decommissioned] [float] NULL,
	[estimated_population] [float] NULL,
	[notes] [nvarchar](255) NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_Lookup_ZipCode] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO




USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[EyeColor]    Script Date: 8/3/2023 7:52:18 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[EyeColor](
	[EyeColorCode] [nvarchar](4) NOT NULL,
	[EyeColor] [nvarchar](100) NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL
) ON [PRIMARY]
GO



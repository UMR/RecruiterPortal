USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserDetails]    Script Date: 2/3/2020 2:10:57 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

ALTER TABLE [dbo].[UserDetails]
ALTER COLUMN [ZipCode] [nvarchar](50) NULL
GO

ALTER TABLE [dbo].[UserDetails]
ALTER COLUMN [City] [nvarchar](50) NULL
GO

ALTER TABLE [dbo].[UserDetails]
ALTER COLUMN [StateName] [nvarchar](50) NULL
GO

ALTER TABLE [dbo].[UserDetails]
ALTER COLUMN [StreetAddress] [nvarchar](500) NULL
GO


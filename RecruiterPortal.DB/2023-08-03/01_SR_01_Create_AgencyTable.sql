USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[Agency]    Script Date: 8/3/2023 6:05:32 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Agency](
	[AgencyId] [bigint] IDENTITY(1,1) NOT NULL,
	[AgencyName] [nvarchar](500) NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[AgencyAddress] [nvarchar](512) NULL,
	[URLPrefix] [nvarchar](256) NULL,
	[AgencyEmail] [nvarchar](256) NULL,
	[AgencyPhone] [nvarchar](15) NULL,
	[AgencyContactPerson] [nvarchar](256) NULL,
	[AgencyContactPersonPhone] [nvarchar](15) NULL,
	[IsActive] [bit] NULL,
	[AgencyLoginId] [nvarchar](256) NULL,
 CONSTRAINT [PK_Agency] PRIMARY KEY CLUSTERED 
(
	[AgencyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO




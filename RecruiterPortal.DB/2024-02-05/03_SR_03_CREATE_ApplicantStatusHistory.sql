USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[ApplicantStatusHistory]    Script Date: 2/5/2024 6:37:27 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ApplicantStatusHistory](
    [HistoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[ID] [bigint] NOT NULL,
	[ApplicantId] [bigint] NOT NULL,
	[PositionId] [int] NULL,
	[InstitutionId] [int] NULL,
	[AgencyId] [bigint] NOT NULL,
	[Status] [tinyint] NOT NULL,
	[Date] [datetime] NULL,
	[TotalFee] [float] NULL,
	[NetFee] [float] NULL,
	[RefFee] [float] NULL,
	[CurrentSalary] [decimal](10, 2) NULL,
	[ExpectedSalary] [decimal](10, 2) NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[ProfileStatus] [tinyint] NULL,
	[Shift] [varchar](50) NULL,
	[IsActive] [bit] NULL,
	[Notes] [nvarchar](500) NULL,
 CONSTRAINT [PK_ApplicantStatusHistory] PRIMARY KEY CLUSTERED 
(
	[HistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO



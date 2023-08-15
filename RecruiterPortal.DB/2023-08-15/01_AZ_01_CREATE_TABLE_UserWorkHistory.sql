USE [UMRRecruitmentApplicant]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserWorkHistory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[InstituteId] [int] NULL,
	[InstituteName] [nvarchar](200),
	[City] [varchar](100) NULL,
	[PositionId] [int] NULL,
	[PositionName] [varchar](200) NULL,	
	[FromDate] [datetime] NULL,
	[Todate] [datetime] NULL,
	[IsContinuing] [bit] NOT NULL,
	[Salary] [nvarchar](250) NULL,	
	[ReasonForLeaving] [text] NULL,
	[Supervisor] [varchar](100) NULL,
	[SupervisorPhone] [varchar](50) NULL,		
	[Responisiblities] [varchar](500) NULL,
	[IsPrevSupervisor] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL	
 CONSTRAINT [PK_UserWorkHistory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO




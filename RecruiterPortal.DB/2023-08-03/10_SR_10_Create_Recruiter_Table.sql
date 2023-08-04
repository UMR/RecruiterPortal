USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 8/4/2023 12:11:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Recruiter](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[LoginId] [varchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Password] [varchar](200) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Telephone] [varchar](15) NULL,
	[ODAPermission] [bit] NOT NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[TimeOut] [int] NOT NULL,
	[AgencyID] [bigint] NULL,
	[ApplicantTypeID] [bigint] NULL,
 CONSTRAINT [PK_Recruiter] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Recruiter] ADD  CONSTRAINT [DF_Recruiter_ODAPermission]  DEFAULT ((0)) FOR [ODAPermission]
GO

ALTER TABLE [dbo].[Recruiter] ADD  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[Recruiter] ADD  DEFAULT ((144000)) FOR [TimeOut]
GO

ALTER TABLE [dbo].[Recruiter]  WITH CHECK ADD  CONSTRAINT [FK_Recruiter_Agency_AgencyID] FOREIGN KEY([AgencyID])
REFERENCES [dbo].[Agency] ([AgencyID])
GO

ALTER TABLE [dbo].[Recruiter] CHECK CONSTRAINT [FK_Recruiter_Agency_AgencyID]
GO


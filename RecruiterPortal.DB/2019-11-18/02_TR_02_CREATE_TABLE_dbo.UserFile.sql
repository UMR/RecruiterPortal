USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserCompany]    Script Date: 11/18/2019 12:32:15 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserCompany](
	[UseCompanyID] [bigint] NOT NULL,
	[CompanyName] [nvarchar](500) NOT NULL,
	[EMInstituteID] [bigint] NULL,
	[CompanyAddress] [nvarchar](500) NOT NULL,
	[Supervisor] [nvarchar](250) NOT NULL,
	[CompanyPhone] [nvarchar](50) NOT NULL,
	[JobTItle] [nvarchar](500) NOT NULL,
	[EMPositionID] [bigint] NULL,
	[StartingSalary] [nvarchar](200) NOT NULL,
	[EndingSalary] [nvarchar](200) NOT NULL,
	[FromDate] [datetime] NOT NULL,
	[ToDate] [datetime] NULL,
	[UserID] [bigint] NOT NULL,
	[CanContactThisEmployer] [bit] NOT NULL,
	[LeaveReason] [nvarchar](500) NULL,
 CONSTRAINT [PK_UseCompany] PRIMARY KEY CLUSTERED 
(
	[UseCompanyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserCompany]  WITH CHECK ADD  CONSTRAINT [FK_UseCompany_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserCompany] CHECK CONSTRAINT [FK_UseCompany_User]
GO



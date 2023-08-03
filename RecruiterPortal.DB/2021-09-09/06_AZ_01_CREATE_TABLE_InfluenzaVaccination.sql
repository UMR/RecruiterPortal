USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[InfluenzaVaccination]    Script Date: 9/9/2021 2:09:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[InfluenzaVaccination](
	[InfluenzaVaccinationID] [bigint] IDENTITY(1,1) NOT NULL,
	[FacilityName] [nvarchar](500) NULL,
	[ReasonDeclination] [nvarchar](500) NULL,
	[Signature] [nvarchar](500) NULL,
	[EntryDate] [datetime] NULL,
	[Name] [nvarchar](500) NULL,
	[Department] [nvarchar](500) NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_InfluenzaVaccination] PRIMARY KEY CLUSTERED 
(
	[InfluenzaVaccinationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[InfluenzaVaccination]  WITH CHECK ADD  CONSTRAINT [FK_InfluenzaVaccination_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[InfluenzaVaccination] CHECK CONSTRAINT [FK_InfluenzaVaccination_UserID]
GO



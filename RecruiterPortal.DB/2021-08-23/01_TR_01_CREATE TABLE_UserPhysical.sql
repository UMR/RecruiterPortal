USE [UMRRecruitmentApplicant]
GO

/****** Object:  Table [dbo].[UserDetails]    Script Date: 8/23/2021 2:35:48 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserPhysical](
	[UserPhysicalID] [bigint] IDENTITY(1,1) NOT NULL,
	[Height] NVARCHAR(10) NULL, 
	[EyeColor] NVARCHAR (200) NULL,
	[Race] NVARCHAR (15) NULL,
	[Weight] NVARCHAR(10) NULL, 
	[HairColor] NVARCHAR(50) NULL,
	[UserID] [bigint] NOT NULL,
	[CreatedDate] [datetime] NOT NULL
 CONSTRAINT [PK_UserPhysical] PRIMARY KEY CLUSTERED 
(
	[UserPhysicalID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserPhysical] ADD  CONSTRAINT [DF__UserPhysical__Creat__6166761E]  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[UserPhysical]  WITH CHECK ADD  CONSTRAINT [FK_UserPhysical_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO

ALTER TABLE [dbo].[UserPhysical] CHECK CONSTRAINT [FK_UserPhysical_User]
GO



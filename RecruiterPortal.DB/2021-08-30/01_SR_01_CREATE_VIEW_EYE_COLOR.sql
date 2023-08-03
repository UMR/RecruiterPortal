USE [UMRRecruitmentApplicant]
GO

/****** Object:  View [dbo].[View_Race]    Script Date: 8/30/2021 3:14:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[View_Eye_Color]
AS
SELECT EyeColor
FROM UMRRecruitementDB_New.[dbo].[EyeColor]

GO



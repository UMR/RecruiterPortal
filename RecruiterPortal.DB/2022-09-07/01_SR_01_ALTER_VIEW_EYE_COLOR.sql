USE [UMRRecruitmentApplicant]
GO

/****** Object:  View [dbo].[View_Eye_Color]    Script Date: 9/7/2022 2:11:49 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER VIEW [dbo].[View_Eye_Color]
AS
SELECT EyeColor,EyeColorCode
FROM UMRRecruitementDB_New.[dbo].[EyeColor]

GO



USE [UMRRecruitmentApplicant]
GO

/****** Object:  View [dbo].[View_Hair_Color]    Script Date: 9/7/2022 2:20:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER VIEW [dbo].[View_Hair_Color]
AS
SELECT HairColorCode,HairColor
FROM UMRRecruitementDB_New.[dbo].[HairColor]

GO



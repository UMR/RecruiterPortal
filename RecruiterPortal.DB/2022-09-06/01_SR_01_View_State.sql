USE [UMRRecruitmentApplicant]
GO

/****** Object:  View [dbo].[View_State]    Script Date: 9/6/2022 4:24:26 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[View_State]
AS
SELECT DISTINCT * From [UMRRecruitementDB_New].[dbo].[State]
GO



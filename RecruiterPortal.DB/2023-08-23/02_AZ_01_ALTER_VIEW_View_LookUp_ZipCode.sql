USE [UMRRecruitmentApplicant]
GO

/****** Object:  View [dbo].[View_LookUp_ZipCode]    Script Date: 8/31/2023 12:49:12 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER VIEW [dbo].[View_LookUp_ZipCode]
AS
SELECT DISTINCT S.StateCode, S.StateName, Z.ZipCode, Z.City, Z.StateAbbr, Z.County, Z.decommissioned, S.Description
FROM Lookup_ZipCode AS Z INNER JOIN [State] AS S ON Z.StateAbbr = S.StateCode



GO



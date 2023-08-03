USE [UMRRecruitmentApplicant]
GO

/****** Object:  View [dbo].[View_LookUp_ZipCode]    Script Date: 11/20/2019 2:39:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[View_LookUp_ZipCode]
AS
SELECT DISTINCT 
                         UMRRecruitementDB_New.dbo.State.SateCode, UMRRecruitementDB_New.dbo.State.StateName, UMRRecruitementDB_New.dbo.Lookup_ZipCode.ZipCode, UMRRecruitementDB_New.dbo.Lookup_ZipCode.City, 
                         UMRRecruitementDB_New.dbo.Lookup_ZipCode.StateAbbr, UMRRecruitementDB_New.dbo.Lookup_ZipCode.County, UMRRecruitementDB_New.dbo.Lookup_ZipCode.decommissioned, 
                         UMRRecruitementDB_New.dbo.State.Description
FROM            UMRRecruitementDB_New.dbo.Lookup_ZipCode INNER JOIN
                         UMRRecruitementDB_New.dbo.State ON UMRRecruitementDB_New.dbo.Lookup_ZipCode.StateAbbr = UMRRecruitementDB_New.dbo.State.SateCode
GO
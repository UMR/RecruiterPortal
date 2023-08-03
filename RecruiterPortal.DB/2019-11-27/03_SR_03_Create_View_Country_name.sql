USE [UMRRecruitmentApplicant]
GO

/****** Object:  View [dbo].[View_LookUp_ZipCode]    Script Date: 11/20/2019 2:39:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[View_Country_name]
AS
SELECT DISTINCT 
                         [UMRRecruitementDB_New].[dbo].[Country].CountryName 
FROM                     [UMRRecruitementDB_New].[dbo].[Country]
GO
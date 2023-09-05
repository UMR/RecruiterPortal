USE [UMRRecruitmentApplicant]
GO

/****** Object:  View [dbo].[View_IssueAuthority]    Script Date: 9/5/2023 12:49:56 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER VIEW [dbo].[View_IssueAuthority]
AS

SELECT 'Federal' AS IssueAuthority
UNION
SELECT 'Armed Force' AS IssueAuthority
UNION
SELECT 'School' AS IssueAuthority
UNION
SELECT CountryName AS IssueAuthority FROM dbo.Country
UNION
SELECT StateName AS IssueAuthority FROM dbo.[State] 

GO



USE [UMRRecruitmentApplicant]
GO

/****** Object:  View [dbo].[View_IssueAuthority]    Script Date: 8/3/2023 7:58:45 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[ViewIssuingAuthority]
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



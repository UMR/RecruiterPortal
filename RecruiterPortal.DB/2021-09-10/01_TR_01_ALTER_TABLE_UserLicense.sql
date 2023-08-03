ALTER TABLE dbo.[UserLicense]
ADD IssueAuthority varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
GO


ALTER TABLE dbo.[UserLicense]
ADD StateCode char(3) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
GO

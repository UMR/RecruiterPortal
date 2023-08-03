ALTER TABLE dbo.UserEducation
ALTER COLUMN Degree nvarchar(200) NOT NULL
--WITH (ONLINE = ON)
GO

ALTER TABLE dbo.UserReference
ALTER COLUMN CompanyName nvarchar(200)
--WITH (ONLINE = ON)
GO
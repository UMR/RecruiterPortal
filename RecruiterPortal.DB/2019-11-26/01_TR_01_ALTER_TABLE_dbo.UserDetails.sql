ALTER TABLE dbo.UserDetails
ALTER COLUMN SSN nvarchar(10)
--WITH (ONLINE = ON)
GO

ALTER TABLE dbo.UserDetails
ALTER COLUMN Apt nvarchar(50)
--WITH (ONLINE = ON)
GO

ALTER TABLE dbo.UserDetails
ALTER COLUMN DateAvailable datetime
--WITH (ONLINE = ON)
GO

ALTER TABLE dbo.UserDetails
ALTER COLUMN DesiredSalary nvarchar(200)
--WITH (ONLINE = ON)
GO

ALTER TABLE dbo.UserDetails
ALTER COLUMN DesiredPosition varchar(500)
--WITH (ONLINE = ON)
GO

ALTER TABLE dbo.UserDetails
ALTER COLUMN CreatedDate datetime NOT NULL

GO
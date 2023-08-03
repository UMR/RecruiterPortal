EXEC sp_rename N'dbo.UserDetails.DesiredPositionId', N'DesiredPosition', 'COLUMN'
GO

ALTER TABLE dbo.UserDetails
ALTER COLUMN DesiredPosition varchar(500) NOT NULL
--WITH (ONLINE = ON)
GO


ALTER TABLE dbo.UserDetails
ADD City nvarchar(50) NULL
GO

ALTER TABLE dbo.UserDetails
ALTER COLUMN City nvarchar(50) NOT NULL
GO

ALTER TABLE dbo.UserDetails
ADD StateName nvarchar(50) NOT NULL
GO
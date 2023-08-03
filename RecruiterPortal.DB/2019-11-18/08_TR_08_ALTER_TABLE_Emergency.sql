EXEC sp_rename N'dbo.UserEmergencyInfo.PhoneType', N'EmrHomePhone', 'COLUMN'
GO

ALTER TABLE dbo.UserEmergencyInfo
ALTER COLUMN EmrHomePhone nvarchar(50) NOT NULL
--WITH (ONLINE = ON)
GO

EXEC sp_rename N'dbo.UserEmergencyInfo.EmrPhone', N'EmrCellPhone', 'COLUMN'
GO

ALTER TABLE dbo.UserEmergencyInfo
ADD EmrWorkPhone varchar(50) NULL
GO

ALTER TABLE dbo.UserEmergencyInfo
ALTER COLUMN EmrCellPhone nvarchar(50)
--WITH (ONLINE = ON)
GO


ALTER TABLE dbo.UserEmergencyInfo
ALTER COLUMN NatureOfRelationship nvarchar(50)
--WITH (ONLINE = ON)
GO
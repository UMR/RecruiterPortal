﻿ALTER TABLE dbo.USCIS
ALTER COLUMN I94AdmissionNumber nvarchar(500)
WITH (ONLINE = ON)
GO
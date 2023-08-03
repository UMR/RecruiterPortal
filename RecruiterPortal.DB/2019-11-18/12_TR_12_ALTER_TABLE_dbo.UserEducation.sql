ALTER TABLE dbo.UserEducation
ADD InstitutionType tinyint NULL
GO

-- Changing table properties

ALTER TABLE dbo.UserEducation
DROP CONSTRAINT PK_UserEducation
GO

ALTER TABLE dbo.UserEducation
ALTER COLUMN UserEducationID bigint NOT NULL
WITH (ONLINE = ON)
GO

ALTER TABLE dbo.UserEducation
ADD CONSTRAINT PK_UserEducation 
PRIMARY KEY CLUSTERED (UserEducationID)
WITH (
  PAD_INDEX = OFF,
  IGNORE_DUP_KEY = OFF,
  STATISTICS_NORECOMPUTE = OFF,
  ALLOW_ROW_LOCKS = ON,
  ALLOW_PAGE_LOCKS = ON)
ON [PRIMARY]
GO

-- Create a temporary table

IF EXISTS (SELECT o.object_id FROM sys.objects o INNER JOIN sys.schemas u ON o.schema_id = u.schema_id
    WHERE o.name = N'#UserEducation5317' AND u.name = N'dbo')
BEGIN
  DROP TABLE dbo.#UserEducation5317
END
GO

CREATE TABLE dbo.#UserEducation5317 (
  UserEducationID bigint NOT NULL,
  SchoolName nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
  SchoolAddress nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
  Degree nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
  FromDate datetime NOT NULL,
  ToDate datetime NOT NULL,
  IsGraduate bit NOT NULL,
  UserID bigint NOT NULL,
  CreatedDate datetime NULL,
  InstitutionType tinyint NULL
)
GO

-- Copy the source table's data to the temporary table

INSERT INTO dbo.#UserEducation5317 (UserEducationID, SchoolName, SchoolAddress, Degree, FromDate, ToDate, IsGraduate, UserID, CreatedDate, InstitutionType)
SELECT UserEducationID, SchoolName, SchoolAddress, Degree, FromDate, ToDate, IsGraduate, UserID, CreatedDate, InstitutionType FROM dbo.UserEducation
GO

-- Drop the source table

DROP TABLE dbo.UserEducation
GO

-- Create the destination table

CREATE TABLE dbo.UserEducation (
  UserEducationID bigint IDENTITY(1, 1) NOT NULL,
  SchoolName nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
  SchoolAddress nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
  Degree nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
  FromDate datetime NOT NULL,
  ToDate datetime NOT NULL,
  IsGraduate bit NOT NULL,
  UserID bigint NOT NULL,
  CreatedDate datetime DEFAULT getdate() NULL,
  InstitutionType tinyint NULL,
  CONSTRAINT PK_UserEducation PRIMARY KEY CLUSTERED (UserEducationID)
    WITH (
      PAD_INDEX = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF,
      ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON),
  CONSTRAINT FK_UserEducation_User FOREIGN KEY (UserID) 
  REFERENCES dbo.[User] (UserID) 
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
)
ON [PRIMARY]
GO

ALTER TABLE dbo.UserEducation
NOCHECK CONSTRAINT FK_UserEducation_User
GO

-- Copy the temporary table's data to the destination table

SET IDENTITY_INSERT [dbo].[UserEducation] ON
GO

INSERT INTO dbo.UserEducation (UserEducationID, SchoolName, SchoolAddress, Degree, FromDate, ToDate, IsGraduate, UserID, CreatedDate, InstitutionType)
SELECT UserEducationID, SchoolName, SchoolAddress, Degree, FromDate, ToDate, IsGraduate, UserID, CreatedDate, InstitutionType FROM dbo.#UserEducation5317
GO

SET IDENTITY_INSERT [dbo].[UserEducation] OFF
GO

-- Enable disabled constraints

ALTER TABLE dbo.UserEducation
WITH CHECK CHECK CONSTRAINT FK_UserEducation_User
GO
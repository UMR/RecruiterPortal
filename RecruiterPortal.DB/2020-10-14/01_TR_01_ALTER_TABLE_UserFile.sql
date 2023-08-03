ALTER TABLE dbo.UserFile
ADD FileType tinyint DEFAULT 3 NOT NULL
GO

--------------- SQL ---------------

-- Create a temporary table

IF EXISTS (SELECT o.object_id FROM sys.objects o INNER JOIN sys.schemas u ON o.schema_id = u.schema_id
    WHERE o.name = N'#UserFile3710' AND u.name = N'dbo')
BEGIN
  DROP TABLE dbo.#UserFile3710
END
GO

CREATE TABLE dbo.#UserFile3710 (
  UserFileID bigint NOT NULL,
  FIleData varbinary(max) NOT NULL,
  FileName nvarchar(max) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
  CreatedDate datetime NOT NULL,
  UserID bigint NOT NULL,
  FileType tinyint NOT NULL
)
GO

-- Copy the source table's data to the temporary table

INSERT INTO dbo.#UserFile3710 (UserFileID, FIleData, FileName, CreatedDate, UserID, FileType)
SELECT UserFileID, FIleData, FileName, CreatedDate, UserID, FileType FROM dbo.UserFile
GO

-- Drop the source table

DROP TABLE dbo.UserFile
GO

-- Create the destination table

CREATE TABLE dbo.UserFile (
  UserFileID bigint IDENTITY(1, 1) NOT NULL,
  FileType tinyint DEFAULT 3 NOT NULL,
  FIleData varbinary(max) NOT NULL,
  FileName nvarchar(max) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
  CreatedDate datetime DEFAULT getdate() NOT NULL,
  UserID bigint NOT NULL,
  CONSTRAINT PK_UserFiles PRIMARY KEY CLUSTERED (UserFileID)
    WITH (
      PAD_INDEX = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF,
      ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON),
  CONSTRAINT FK_UserFiles_User FOREIGN KEY (UserID) 
  REFERENCES dbo.[User] (UserID) 
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
)
ON [PRIMARY]
GO

ALTER TABLE dbo.UserFile
NOCHECK CONSTRAINT FK_UserFiles_User
GO

-- Copy the temporary table's data to the destination table

SET IDENTITY_INSERT [dbo].[UserFile] ON
GO

INSERT INTO dbo.UserFile (UserFileID, FileType, FIleData, FileName, CreatedDate, UserID)
SELECT UserFileID, FileType, FIleData, FileName, CreatedDate, UserID FROM dbo.#UserFile3710
GO

SET IDENTITY_INSERT [dbo].[UserFile] OFF
GO

-- Enable disabled constraints

ALTER TABLE dbo.UserFile
WITH CHECK CHECK CONSTRAINT FK_UserFiles_User
GO
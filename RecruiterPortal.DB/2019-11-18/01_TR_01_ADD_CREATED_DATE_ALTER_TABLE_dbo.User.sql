﻿ALTER TABLE dbo.[User]
ADD CreatedDate datetime DEFAULT GETDATE() WITH VALUES NULL
GO


ALTER TABLE dbo.UserRecruiterComment
ADD DEFAULT GETDATE() FOR CommentDate
GO

ALTER TABLE dbo.UserFile
ADD DEFAULT GETDATE() FOR CreatedDate
GO
SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW dbo.View_MailConfiguration
AS
SELECT        ConfigurationId, ProfileName, UserId, POP3Server, POP3Port, POP3EnableSSL, POP3UserName, POP3Password, SMTPServer, SMTPPort, SMTPUserName, SMTPPassword, IsBirthdayMail, GoogleRefreshToken, 
                         GoogleDriveFolderId, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate, IsGoogleApiError
FROM            UMRRecruitementDB_New.dbo.MailConfiguration
GO
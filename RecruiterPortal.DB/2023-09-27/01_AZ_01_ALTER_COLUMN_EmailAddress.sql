Use [UMRRecruitmentApplicant]
GO

ALTER TABLE MailTemplate
ALTER COLUMN EmailAddress INT 

EXEC sp_rename 'MailTemplate.EmailAddress', 'RecruiterMailConfigId', 'COLUMN';
USE [UMRRecruitmentApplicant]
GO


CREATE PROCEDURE [dbo].[sp_DeleteRecruiterRoleByRecruiterId]
(
    @RecruiterId NVARCHAR(50)
)

AS
DELETE FROM [dbo].[RecruiterRoles] WHERE RecruiterId=@RecruiterId

GO



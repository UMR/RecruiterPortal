USE [UMRRecruitmentApplicant]
GO

CREATE PROCEDURE [dbo].[sp_DeleteEducationByUserID]
(
    @UserID bigint
)

AS

DELETE FROM [dbo].[UserEducation] WHERE UserID=@UserID;
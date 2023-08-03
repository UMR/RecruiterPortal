USE [UMRRecruitmentApplicant]
GO

CREATE PROCEDURE [dbo].[sp_GetEducationByUserID]
(
    @UserID bigint
)

AS

SELECT * FROM [dbo].[UserEducation] WHERE UserID=@UserID;

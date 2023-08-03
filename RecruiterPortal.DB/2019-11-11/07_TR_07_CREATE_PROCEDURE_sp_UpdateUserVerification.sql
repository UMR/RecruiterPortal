USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserVerification]    Script Date: 11/11/2019 4:00:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateUserVerification]
(
	@UserID bigint,
	@p_VerficationCode nvarchar(10)
)

AS
UPDATE [UserVerification] 
SET 
Active = 0
WHERE
UserID = @UserID AND VerficationCode = @p_VerficationCode AND Active = 1

UPDATE [User] 
SET
IsVerified = 1
WHERE
UserID = @UserID

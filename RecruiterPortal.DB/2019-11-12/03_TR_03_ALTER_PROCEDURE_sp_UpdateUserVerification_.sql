USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserVerification]    Script Date: 11/12/2019 7:06:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_UpdateUserVerification]
(
	@p_UserID bigint,
	@p_VerficationCode nvarchar(10)
)

AS
UPDATE [User] 
SET
IsVerified = 1
WHERE
UserID IN(SELECT [UserID] FROM [UserVerification] WHERE UserID = @p_UserID AND VerficationCode = @p_VerficationCode AND Active = 1)

UPDATE [UserVerification] 
	SET 
		Active = 0
	WHERE
		UserID = @p_UserID AND VerficationCode = @p_VerficationCode AND Active = 1


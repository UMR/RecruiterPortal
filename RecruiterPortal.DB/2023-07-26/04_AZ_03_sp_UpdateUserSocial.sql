USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserSocial]    Script Date: 7/27/2023 4:36:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_UpdateUserSocial]
(
	@Linkedin nvarchar(1000) NULL,
	@Twitter nvarchar(1000) NULL,
	@FaceBook nvarchar(1000) NULL,	
	@UserID bigint,	
	@SocialId bigint
)

AS
BEGIN
UPDATE [dbo].[UserSocial]
	SET	 [Linkedin] = @Linkedin
		,[Twitter] = @Twitter
		,[FaceBook] = @FaceBook	
		,[UserID] = @UserID			
WHERE [SocialId] = @SocialId

END

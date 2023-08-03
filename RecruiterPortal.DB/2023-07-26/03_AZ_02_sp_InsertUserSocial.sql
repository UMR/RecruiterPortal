USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserSocial]    Script Date: 7/26/2023 5:02:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_InsertUserSocial]	
	@Linkedin nvarchar(1000) NULL,
	@Twitter nvarchar(1000) NULL,
	@FaceBook nvarchar(1000) NULL,	
	@UserID bigint,
	@CreatedDate datetime
AS
BEGIN	

	SET NOCOUNT ON; 
	
INSERT INTO [dbo].[UserSocial]
           (		    
			 [Linkedin] 
			,[Twitter]
			,[FaceBook]			
			,[UserID] 
			,[CreatedDate]
		  )
     VALUES
           (
		     @Linkedin
			,@Twitter
			,@FaceBook			
			,@UserID
			,@CreatedDate
		  )
END

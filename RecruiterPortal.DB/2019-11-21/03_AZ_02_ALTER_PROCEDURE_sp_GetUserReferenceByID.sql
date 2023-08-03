USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserReferenceByUserID]    Script Date: 21-Nov-19 12:38:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetUserReferenceByID]
	@UserReferenceID bigint
AS
	SET NOCOUNT ON;
	SELECT * FROM UserReference WHERE [UserReferenceID] = @UserReferenceID
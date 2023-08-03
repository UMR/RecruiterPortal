USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserPhoto]    Script Date: 7/27/2023 3:04:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetUserPhoto] 
	-- Add the parameters for the stored procedure here
	@UserID BIGINT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT *  FROM [dbo].[UserPhoto]
  WHERE UserID = @UserID
    
END
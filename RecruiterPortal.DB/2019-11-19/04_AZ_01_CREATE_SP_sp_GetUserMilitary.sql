USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserMilitary]    Script Date: 19-Nov-19 8:29:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetUserMilitary] 
	-- Add the parameters for the stored procedure here
	@p_UserID BIGINT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [UserMilitaryID]
      ,[Branch]
      ,[FromDate]
      ,[ToDate]
      ,[RankAtDischarge]
      ,[TypeOfDischarge]
      ,[DisonourComment]
      ,[UserID]
      ,[CreatedDate]
  FROM [dbo].[UserMilitary]
  WHERE UserID = @p_UserID
    
END

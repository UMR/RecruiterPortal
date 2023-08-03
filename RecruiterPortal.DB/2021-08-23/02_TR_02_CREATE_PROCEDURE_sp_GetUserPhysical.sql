USE [UMRRecruitmentApplicant]
GO

/****** Object:  StoredProcedure [dbo].[sp_GetUserMilitary]    Script Date: 8/23/2021 2:46:52 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetUserPhysical] 
	-- Add the parameters for the stored procedure here
	@p_UserID BIGINT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [UserPhysicalID]
      ,[Height]
      ,[EyeColor]
      ,[Race]
      ,[Weight]
      ,[HairColor]
      ,[UserID]
      ,[CreatedDate]
  FROM [dbo].[UserPhysical]
  WHERE UserID = @p_UserID
    
END
GO



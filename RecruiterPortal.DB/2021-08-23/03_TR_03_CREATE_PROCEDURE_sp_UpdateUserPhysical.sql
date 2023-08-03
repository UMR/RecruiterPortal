USE [UMRRecruitmentApplicant]
GO

/****** Object:  StoredProcedure [dbo].[sp_UpdateUserMilitary]    Script Date: 8/23/2021 2:48:18 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_UpdateUserPhysical]
(
	@p_UserPhysicalID bigint,
	@p_Height nvarchar (10),
	@p_EyeColor nvarchar (200),
	@p_Race nvarchar (15),
	@p_Weight nvarchar (150),
	@p_HairColor nvarchar (50),	
	@p_UserID  bigint
)

AS
UPDATE [dbo].[UserPhysical]
   SET [Height] = @p_Height
      ,[EyeColor] = @p_EyeColor
      ,[Race] = @p_Race
      ,[Weight] = @p_Weight
      ,[HairColor] = @p_HairColor
      ,[UserID] = @p_UserID
 WHERE
[UserPhysicalID] = @p_UserPhysicalID
GO



USE [UMRRecruitmentApplicant]
GO

/****** Object:  StoredProcedure [dbo].[sp_InsertUserMilitary]    Script Date: 8/23/2021 2:47:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_InsertUserPhysical] 
	-- Add the parameters for the stored procedure here
	@p_Height nvarchar (10),
	@p_EyeColor nvarchar (200),
	@p_Race nvarchar (15),
	@p_Weight nvarchar (150),
	@p_HairColor nvarchar (50),	
	@p_UserID  bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
INSERT INTO [dbo].[UserPhysical]
( 
	[Height],
	[EyeColor],
	[Race],
	[Weight],
	[HairColor],
	UserID	
)
VALUES 
(
	@p_Height,
	@p_EyeColor,
	@p_Race,
	@p_Weight,
	@p_HairColor,
	@p_UserID		
)

END
GO



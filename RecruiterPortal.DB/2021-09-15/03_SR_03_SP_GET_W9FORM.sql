﻿USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserW9Form]    Script Date: 9/6/2021 9:01:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[sp_GetUserW9Form] 
	-- Add the parameters for the stored procedure here
	@p_UserID BIGINT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
  FROM [dbo].[W9From]
  WHERE UserID = @p_UserID
    
END
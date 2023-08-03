USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetStateCode]    Script Date: 9/6/2022 4:49:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetStateCode] 
	-- Add the parameters for the stored procedure here
	@StateName nvarchar(100)
AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT TOP 1 * FROM View_State WHERE StateName=@StateName
END

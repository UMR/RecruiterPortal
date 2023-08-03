USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetPosition]    Script Date: 6/14/2023 2:20:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_GET_App_Version] 
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM [dbo].[AppVersion]
END


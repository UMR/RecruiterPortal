USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[SP_All_GET_Agency]    Script Date: 8/21/2023 5:22:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetRole]  
AS 
BEGIN      
	SELECT * FROM [Roles];
END
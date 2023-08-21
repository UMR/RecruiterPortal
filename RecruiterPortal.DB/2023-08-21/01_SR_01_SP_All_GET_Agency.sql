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
ALTER PROCEDURE [dbo].[SP_All_GET_Agency]  
AS 
BEGIN      
	SELECT * FROM [Agency] WHERE IsActive=1 ;
END
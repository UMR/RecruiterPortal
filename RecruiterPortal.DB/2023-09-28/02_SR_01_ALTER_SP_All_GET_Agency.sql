USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[SP_All_GET_Agency]    Script Date: 9/28/2023 2:32:15 PM ******/
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
	SELECT * FROM [Agency] ;
END
USE [UMRRecruitmentApplicant]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_Get_All_Active_Agency]     
AS 
BEGIN      
	SELECT * FROM Agency WHERE  IsActive = 1
END
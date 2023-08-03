﻿USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[SP_View_Agency]    Script Date: 1/23/2023 6:54:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_GET_AgencyByUrl]  
   @p_Url NVARCHAR(1000)
AS 
BEGIN      
	SELECT *
	FROM [View_Agency] WHERE  URLPrefix = @p_Url;
END
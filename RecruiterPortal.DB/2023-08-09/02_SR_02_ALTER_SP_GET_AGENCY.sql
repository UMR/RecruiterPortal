USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_AgencyByUrl]    Script Date: 8/9/2023 8:02:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SP_GET_AgencyByUrl]  
   @p_Url NVARCHAR(1000)
AS 
BEGIN      
	SELECT * FROM [Agency] WHERE  URLPrefix = @p_Url;
END
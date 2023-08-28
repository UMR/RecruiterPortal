USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[SP_All_GET_Recruiter]    Script Date: 8/28/2023 7:59:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_GET_All_Recruiter]  
AS 
BEGIN      
	SELECT * FROM [Recruiter] WHERE IsActive=1 ;
END
USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetUserEmailByRank]    Script Date: 02/24/2021 12:14:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SP_GetUserEmailByRank]  
   @EnumID int
AS 
BEGIN      
	
	EXEC [UMRRecruitementDB_New].[dbo].[SP_GetUserEmailByRank] @EnumID

END
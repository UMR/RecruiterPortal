USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetUserEmailByRank]    Script Date: 2/24/2021 1:39:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_GetUserEmailByRank]  
   @EnumID int
AS 
BEGIN      
	
	SELECT * FROM UMRRecruitementDB_New.[dbo].MailConfiguration 
		WHERE UserId IN(SELECT UserID From UMRRecruitementDB_New.[dbo].UserRank 
							WHERE RankLookupID 
								IN (SELECT [RankLookupID] FROM UMRRecruitementDB_New.[dbo].[RankLookup] WHERE EnumID=@EnumID)
		)

END
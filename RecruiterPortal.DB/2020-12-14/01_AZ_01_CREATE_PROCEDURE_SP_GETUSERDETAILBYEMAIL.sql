USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[SP_GETUSERBYUSERNAME]    Script Date: 12/14/2020 1:05:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_GETUSERDETAILBYEMAIL]  
   @p_Email NVARCHAR(1000)
AS 
BEGIN      
	SELECT * FROM [User] WHERE  [User].Email = @p_Email;
END

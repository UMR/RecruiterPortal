USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_Get_User_Roles]    Script Date: 8/30/2023 4:51:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_Get_User_Roles]  
   @p_UserId int
AS 
BEGIN      
	SELECT R.* FROM RecruiterRoles as RR Join Roles AS R On RR.RoleID = R.RoleID WHERE  UserID = @p_UserId;
END
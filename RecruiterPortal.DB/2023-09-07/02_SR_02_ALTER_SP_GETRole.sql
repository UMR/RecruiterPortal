USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_Get_User_Roles]    Script Date: 9/7/2023 5:58:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[sp_Get_User_Roles]  
   @p_RecruiterId int
AS 
BEGIN      
	SELECT R.* FROM RecruiterRoles as RR Join Roles AS R On RR.RoleID = R.RoleID WHERE  RecruiterId = @p_RecruiterId;
END
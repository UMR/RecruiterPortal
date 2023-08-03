USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetEmrInfoByUserId]    Script Date: 11/18/2019 8:56:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetEmrInfoByUserId] 
    @p_UserID  bigint
AS
BEGIN
  SELECT *
  FROM [UMRRecruitmentApplicant].[dbo].[UserEmergencyInfo]
  where UserID=@p_UserID
END

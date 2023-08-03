USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserMilitary]    Script Date: 18-Nov-19 8:47:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_UpdateUserMilitary]
(
	@p_UserMilitaryID bigint,
	@p_Branch nvarchar (500),
	@p_FromDate datetime,
	@p_ToDate datetime,
	@p_RankAtDischarge nvarchar (150),
	@p_TypeOfDischarge bit,
	@p_DisonourComment nvarchar (500),
	@p_UserID  bigint	
)

AS
UPDATE [dbo].[UserMilitary]
   SET [Branch] = @p_Branch
      ,[FromDate] = @p_FromDate
      ,[ToDate] = @p_ToDate
      ,[RankAtDischarge] = @p_RankAtDischarge
      ,[TypeOfDischarge] = @p_TypeOfDischarge
      ,[DisonourComment] = @p_DisonourComment  
	  ,[UserID] = @p_UserID 
WHERE
UserMilitaryID = @p_UserMilitaryID
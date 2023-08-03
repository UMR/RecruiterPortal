USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUser]    Script Date: 6/14/2023 2:24:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_UpdateAppVersion]
(
	@p_Id bigint,
	@p_CurrenctVersion nvarchar (MAX),
	@p_OldVersion nvarchar (MAX),
	@p_CreatedDate datetime,
	@p_UpdatedDate datetime
)

AS
UPDATE [AppVersion] 
SET 
CurrenctVersion = @p_CurrenctVersion,
OldVersion = @p_OldVersion,
CreatedDate = @p_CreatedDate,
UpdatedDate = @p_UpdatedDate

WHERE Id = @p_Id


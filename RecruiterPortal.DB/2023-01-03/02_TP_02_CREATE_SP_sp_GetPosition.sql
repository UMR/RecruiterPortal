USE [UMRRecruitmentApplicant]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetPosition] 
@Position_Name varchar(100)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM [dbo].[Position] WHERE [Position_Name] LIKE ''+@Position_Name+'%'
END

GO
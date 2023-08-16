USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetInstitution]    Script Date: 8/16/2023 12:54:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_GetPosition] 
@PositionName VARCHAR(250) NULL
AS
BEGIN	

	IF(@PositionName IS NOT NULL)
		SELECT * FROM [dbo].[Position] WHERE PositionName LIKE  @PositionName + '%' ORDER BY PositionName;
	ELSE
	SELECT TOP(100) * FROM [dbo].[Position] ORDER BY PositionName

END



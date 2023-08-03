USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetHairColorCode]    Script Date: 9/7/2022 5:26:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetHairColorCodeByHairColor] 
	 @HairColor nvarchar(100)
AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT * FROM View_Hair_Color WHERE HairColor=@HairColor
END


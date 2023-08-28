USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetZipCodeByZipCode]    Script Date: 8/23/2023 2:45:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[sp_GetZipCodeByZipCode] 
	-- Add the parameters for the stored procedure here
	@Zipcode nvarchar(10)
AS
BEGIN	
	
	SET NOCOUNT ON;
    
	if (@Zipcode IS NOT NULL)
		SELECT TOP 10 * FROM View_LookUp_ZipCode WHERE ZipCode LIKE @Zipcode + '%'
	ELSE
		SELECT TOP 100 * FROM View_LookUp_ZipCode 

END

USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetCountryName]    Script Date: 8/21/2023 8:02:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[sp_GetCountryName] 
	-- Add the parameters for the stored procedure here
	@CountryName nvarchar(10)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    IF (@CountryName IS NOT NULL)
		SELECT TOP 10 * FROM Country WHERE CountryName LIKE ''+@CountryName+'%' ORDER BY CountryName
	ELSE
		SELECT TOP 100 * FROM Country ORDER BY CountryName

END

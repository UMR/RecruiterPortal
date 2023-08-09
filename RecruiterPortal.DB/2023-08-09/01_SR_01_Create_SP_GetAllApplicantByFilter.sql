﻿USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_SyncDataFromApplicantPortalBasic]    Script Date: 8/9/2023 6:27:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- *** SqlDbx Personal Edition ***
-- !!! Not licensed for commercial use beyound 90 days evaluation period !!!
-- For version limitations please check http://www.sqldbx.com/personal_edition.htm
-- Number of queries executed: 400, number of rows retrieved: 691426

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetAllApplicantByFilter] 
	-- Add the parameters for the stored procedure here
	@LastName NVARCHAR(100) = NULL,
	@FirstName NVARCHAR(100) = NULL,
	@Email NVARCHAR(100) = NULL,
	@IsVerified bit = NULL,
	@RecuriterId NVARCHAR(100) = NULL,
	@Take INT = NULL,
	@Skip INT = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SELECT COUNT(App.[UserID]) AS RowNumber FROM [UMRRecruitmentApplicant].[dbo].[User] As App
  WHERE App.AgencyId IN (SELECT AgencyID FROM [dbo].Recruiter WHERE UserID=@RecuriterId)
    AND (@FirstName IS NULL OR ([First_Name] LIKE '%'+ @FirstName +'%'))
	AND (@LastName IS NULL OR ([Last_Name] LIKE '%'+ @LastName +'%' ))
	AND (@Email IS NULL OR ([Email] LIKE '%'+ @Email +'%' ))
	AND (@IsVerified IS NULL OR ([IsVerified] =@IsVerified ))


    -- Select for data row count

SELECT * FROM [UMRRecruitmentApplicant].[dbo].[User] As App
  WHERE  App.AgencyId IN (SELECT AgencyID FROM [dbo].Recruiter WHERE UserID=@RecuriterId)
	AND (@FirstName IS NULL OR (App.[First_Name] LIKE '%'+ @FirstName +'%'))
	AND (@LastName IS NULL OR (App.[Last_Name] LIKE '%'+ @LastName +'%' ))
	AND (@Email IS NULL OR (App.Email LIKE '%'+ @Email +'%' ))
  ORDER BY App.CreatedDate,[Last_Name],[First_Name]
  OFFSET @Skip ROWS FETCH NEXT @Take ROWS ONLY
  
END
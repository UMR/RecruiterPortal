USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllApplicantByFilter]    Script Date: 8/10/2023 2:29:40 PM ******/
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
ALTER PROCEDURE [dbo].[sp_GetAllApplicantByFilter] 
	-- Add the parameters for the stored procedure here
	@LastName NVARCHAR(100) = NULL,
	@FirstName NVARCHAR(100) = NULL,
	@Email NVARCHAR(100) = NULL,
	@IsVerified bit = NULL,
	@CurrentUserId INT = NULL,
	@Take INT = NULL,
	@Skip INT = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SELECT COUNT(App.[UserID]) AS RowNumber FROM [UMRRecruitmentApplicant].[dbo].[User] As App
  WHERE App.AgencyId IN (SELECT AgencyID FROM [dbo].Recruiter WHERE UserID=@CurrentUserId)
    AND ([First_Name] LIKE '%'+ @FirstName +'%')
	AND ([Last_Name] LIKE '%'+ @LastName +'%' )
	AND ([Email] LIKE '%'+ @Email +'%' )
	AND ([IsVerified] =@IsVerified )


    -- Select for data row count

SELECT * FROM [UMRRecruitmentApplicant].[dbo].[User] As App
  WHERE  App.AgencyId IN (SELECT AgencyID FROM [dbo].Recruiter WHERE UserID=@CurrentUserId)
	AND (App.[First_Name] LIKE '%'+ @FirstName +'%')
	AND (App.[Last_Name] LIKE '%'+ @LastName +'%' )
	AND (App.Email LIKE '%'+ @Email +'%' )
	AND ([IsVerified] =@IsVerified )
  ORDER BY App.CreatedDate,[Last_Name],[First_Name]
  OFFSET @Skip ROWS FETCH NEXT @Take ROWS ONLY
  
END
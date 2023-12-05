USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllEmailByFilter]    Script Date: 12/5/2023 4:23:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetAllEmailByFilter] 	
	@LastName NVARCHAR(100) = NULL,
	@FirstName NVARCHAR(100) = NULL,
	@Email NVARCHAR(100) = NULL,
	@IsVerified bit = NULL,
	@CurrentRecruiterId INT = NULL	
AS
BEGIN

SELECT App.Email FROM [UMRRecruitmentApplicant].[dbo].[User] As App
	WHERE  App.AgencyId IN (SELECT AgencyID FROM [dbo].Recruiter WHERE RecruiterID=@CurrentRecruiterId)
	AND (App.[First_Name] LIKE '%'+ @FirstName +'%')
	AND (App.[Last_Name] LIKE '%'+ @LastName +'%' )
	AND (App.Email LIKE '%'+ @Email +'%' )
	AND ([IsVerified] =@IsVerified )
	ORDER BY App.CreatedDate
  
END
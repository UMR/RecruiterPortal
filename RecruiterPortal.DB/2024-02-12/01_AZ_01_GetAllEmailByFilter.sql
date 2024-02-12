USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllEmailByFilter]    Script Date: 2/12/2024 2:07:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_GetAllEmailByFilter] 	
	@LastName NVARCHAR(100) = NULL,
	@FirstName NVARCHAR(100) = NULL,
	@Email NVARCHAR(100) = NULL,
	@IsVerified bit = NULL,
	@CurrentRecruiterId INT = NULL	
AS
BEGIN

--SELECT App.Email FROM [UMRRecruitmentApplicant].[dbo].[User] As App
--	WHERE  App.AgencyId IN (SELECT AgencyID FROM [dbo].Recruiter WHERE RecruiterID=@CurrentRecruiterId)
--	AND (App.[First_Name] LIKE '%'+ @FirstName +'%')
--	AND (App.[Last_Name] LIKE '%'+ @LastName +'%' )
--	AND (App.Email LIKE '%'+ @Email +'%' )
--	AND ([IsVerified] =@IsVerified )
--	ORDER BY App.CreatedDate

	DECLARE @v_LastName NVARCHAR(200) = NULL
	DECLARE @v_FirstName NVARCHAR(200) = NULL
	DECLARE @v_Email NVARCHAR(200) = NULL
	DECLARE @v_IsVerified NVARCHAR(200) = NULL
	DECLARE @v_CurrentRecruiterId INT = NULL	
	DECLARE @v_SqlQuery NVARCHAR(MAX) = NULL
	DECLARE @v_Filter NVARCHAR(MAX) = ''

	--Last Name
	IF( @LastName IS NOT NULL )
		BEGIN
			SET @v_LastName = ' U.[Last_Name] LIKE CONCAT(''%'', ''' + @LastName + ''', ''%'')'
			IF(LEN(@v_Filter) > 0)				
				SET @v_Filter = @v_Filter + ' AND ' + @v_LastName				
			ELSE			
				SET @v_Filter = ' AND ' + @v_Filter + @v_LastName			
		END

	--First Name
	IF( @FirstName IS NOT NULL )
		BEGIN
			SET @v_FirstName = ' U.[First_Name] LIKE CONCAT(''%'', ''' + @FirstName + ''', ''%'')'
			IF(LEN(@v_Filter) > 0)				
				SET @v_Filter = @v_Filter + ' AND ' + @v_FirstName				
			ELSE			
				SET @v_Filter = ' AND ' + @v_Filter + @v_FirstName			
		END

	--Email
	IF( @Email IS NOT NULL )
		BEGIN
			SET @v_Email = ' U.Email LIKE CONCAT(''%'', ''' + @Email + ''', ''%'')'
			IF(LEN(@v_Filter) > 0)				
				SET @v_Filter = @v_Filter + ' AND ' + @v_Email				
			ELSE			
				SET @v_Filter = ' AND ' + @v_Filter + @v_Email			
		END

	--IsVerified
	IF( @IsVerified IS NOT NULL )
		BEGIN
			SET @v_IsVerified = ' U.[IsVerified] = ' + CAST(@IsVerified AS NVARCHAR) + ''			
			IF(LEN(@v_Filter) > 0)				
				SET @v_Filter = @v_Filter + ' AND ' + @v_IsVerified				
			ELSE			
				SET @v_Filter = ' AND ' + @v_Filter + @v_IsVerified			
		END


	SET @v_SqlQuery = N'SELECT U.Email FROM [UMRRecruitmentApplicant].[dbo].[User] AS U
							WHERE U.AgencyId IN (SELECT AgencyID FROM [dbo].Recruiter WHERE RecruiterID = ' + CAST(@CurrentRecruiterId AS NVARCHAR) + ')
								' + @v_Filter + ' ORDER BY U.CreatedDate;'

	EXECUTE sp_executesql @v_SqlQuery;
	
  
END
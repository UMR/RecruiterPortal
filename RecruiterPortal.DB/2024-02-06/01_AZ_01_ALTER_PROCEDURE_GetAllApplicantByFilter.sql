USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllApplicantByFilter]    Script Date: 2/6/2024 12:36:45 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_GetAllApplicantByFilter] 
	-- Add the parameters for the stored procedure here
	@LastName NVARCHAR(100) = NULL,
	@FirstName NVARCHAR(100) = NULL,
	@Email NVARCHAR(100) = NULL,
	@IsVerified bit = NULL,
	@CurrentRecruiterId INT = NULL,
	@Take INT = NULL,
	@Skip INT = NULL
AS
BEGIN
	
	SET NOCOUNT ON;

	--SELECT COUNT(App.[UserID]) AS RowNumber FROM [UMRRecruitmentApplicant].[dbo].[User] As App
	--  WHERE App.AgencyId IN (SELECT AgencyID FROM [dbo].Recruiter WHERE RecruiterID=@CurrentRecruiterId)
	--  AND ([First_Name] LIKE '%'+ @FirstName +'%')
	--	AND ([Last_Name] LIKE '%'+ @LastName +'%' )
	--	AND ([Email] LIKE '%'+ @Email +'%' )
	--	AND ([IsVerified] = @IsVerified )	

	--SELECT * FROM [UMRRecruitmentApplicant].[dbo].[User] As App
	--  WHERE  App.AgencyId IN (SELECT AgencyID FROM [dbo].Recruiter WHERE RecruiterID=@CurrentRecruiterId)
	--	AND (App.[First_Name] LIKE '%'+ @FirstName +'%')
	--	AND (App.[Last_Name] LIKE '%'+ @LastName +'%' )
	--	AND (App.Email LIKE '%'+ @Email +'%' )
	--	AND ([IsVerified] = @IsVerified )
	--  ORDER BY App.CreatedDate,[Last_Name],[First_Name]
	--  OFFSET @Skip ROWS FETCH NEXT @Take ROWS ONLY

	DECLARE @v_LastName NVARCHAR(200) = NULL
	DECLARE @v_FirstName NVARCHAR(200) = NULL
	DECLARE @v_Email NVARCHAR(200) = NULL
	DECLARE @v_IsVerified NVARCHAR(200) = NULL
	DECLARE @v_CurrentRecruiterId INT = NULL
	DECLARE @v_Take INT = NULL
	DECLARE @v_Skip INT = NULL
	DECLARE @v_SqlQuery NVARCHAR(MAX) = NULL
	DECLARE @v_Filter NVARCHAR(MAX) = ''
	DECLARE @v_SqlQueryCount NVARCHAR(MAX) = NULL
	
	--Last Name
	IF( @LastName IS NOT NULL )
		BEGIN
			SET @v_LastName = ' App.[Last_Name] LIKE CONCAT(''%'', ''' + @LastName + ''', ''%'')'
			IF(LEN(@v_Filter) > 0)				
				SET @v_Filter = @v_Filter + ' AND ' + @v_LastName				
			ELSE			
				SET @v_Filter = ' AND ' + @v_Filter + @v_LastName			
		END

	--First Name
	IF( @FirstName IS NOT NULL )
		BEGIN
			SET @v_FirstName = ' App.[First_Name] LIKE CONCAT(''%'', ''' + @FirstName + ''', ''%'')'
			IF(LEN(@v_Filter) > 0)				
				SET @v_Filter = @v_Filter + ' AND ' + @v_FirstName				
			ELSE			
				SET @v_Filter = ' AND ' + @v_Filter + @v_FirstName			
		END

	--Email
	IF( @Email IS NOT NULL )
		BEGIN
			SET @v_Email = ' App.Email LIKE CONCAT(''%'', ''' + @Email + ''', ''%'')'
			IF(LEN(@v_Filter) > 0)				
				SET @v_Filter = @v_Filter + ' AND ' + @v_Email				
			ELSE			
				SET @v_Filter = ' AND ' + @v_Filter + @v_Email			
		END

	--IsVerified
	IF( @IsVerified IS NOT NULL )
		BEGIN
			SET @v_IsVerified = ' App.[IsVerified] = ' + CAST(@IsVerified AS NVARCHAR) + ''			
			IF(LEN(@v_Filter) > 0)				
				SET @v_Filter = @v_Filter + ' AND ' + @v_IsVerified				
			ELSE			
				SET @v_Filter = ' AND ' + @v_Filter + @v_IsVerified			
		END


	SET @v_SqlQueryCount = N'SELECT COUNT(*) AS RowNumber FROM [UMRRecruitmentApplicant].[dbo].[User] AS App
        WHERE App.AgencyId IN (SELECT AgencyID FROM [dbo].Recruiter WHERE RecruiterID = ' + CAST(@CurrentRecruiterId AS NVARCHAR) + ')
        ' + @v_Filter + '';
	

	SET @v_SqlQuery = N'SELECT * FROM [UMRRecruitmentApplicant].[dbo].[User] AS App
        WHERE App.AgencyId IN (SELECT AgencyID FROM [dbo].Recruiter WHERE RecruiterID = ' + CAST(@CurrentRecruiterId AS NVARCHAR) + ')
        ' + @v_Filter + ' ORDER BY App.CreatedDate, [Last_Name], [First_Name]        
        OFFSET ' + CAST(@Skip AS NVARCHAR) + ' ROWS FETCH NEXT ' + CAST(@Take AS NVARCHAR) + ' ROWS ONLY'

	print @v_SqlQueryCount
	print @v_SqlQuery	

    -- Execute the dynamic SQL
	EXECUTE sp_executesql @v_SqlQueryCount;
    EXECUTE sp_executesql @v_SqlQuery;
  
END
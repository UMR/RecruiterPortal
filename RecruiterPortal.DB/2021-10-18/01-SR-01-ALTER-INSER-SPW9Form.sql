USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertW9Form]    Script Date: 10/18/2021 3:39:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER   PROCEDURE [dbo].[sp_InsertW9Form] 
	-- Add the parameters for the stored procedure here
			 @p_UserID  bigint	
            ,@p_Name nvarchar(500)
			,@p_BusinessName nvarchar(500)
			,@p_CompanyLiability bit
			,@p_IndividualProprietor bit
			,@p_CCorporation bit
			,@p_SCorporation bit
			,@p_Partnership bit
			,@p_Trust bit
			,@p_Other bit
			,@p_PayeeCode nvarchar(500)
			,@p_ReportingCode nvarchar(500)
			,@p_StreetAddress nvarchar(500)
			,@p_AptNo nvarchar(500)
			,@p_ZipCode nvarchar(500)
			,@p_City nvarchar(500)
			,@p_StateName nvarchar(500)
			,@p_AccountNumber nvarchar(500)
			,@p_RequesterNameAddress nvarchar(500)
			,@p_SSN nvarchar(500)
			,@p_EmployerIdNo nvarchar(500)
			,@p_Date datetime
		   
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[W9From]
	(		
			[Name]
           ,[BusinessName]
           ,[CompanyLiability]
           ,[IndividualProprietor]
           ,[CCorporation]
           ,[SCorporation]
           ,[Partnership]
		   ,[Trust]
		   ,[Other]
           ,[PayeeCode]
           ,[ReportingCode]
           ,[StreetAddress]
           ,[AptNo]
           ,[ZipCode]
           ,[City]
           ,[StateName]
           ,[AccountNumber]
           ,[RequesterNameAddress]
           ,[SSN]
           ,[EmployerIdNo]
           ,[Date]
           ,[UserID]
	)
	VALUES 
	(    
		 @p_Name 
		,@p_BusinessName 
		,@p_CompanyLiability 
		,@p_IndividualProprietor 
		,@p_CCorporation 
		,@p_SCorporation 
		,@p_Partnership
		,@p_Trust 
		,@p_Other 
		,@p_PayeeCode 
		,@p_ReportingCode 
		,@p_StreetAddress 
		,@p_AptNo
		,@p_ZipCode 
		,@p_City 
		,@p_StateName
		,@p_AccountNumber 
		,@p_RequesterNameAddress 
		,@p_SSN 
		,@p_EmployerIdNo 
		,@p_Date 
		,@p_UserID
	)

END

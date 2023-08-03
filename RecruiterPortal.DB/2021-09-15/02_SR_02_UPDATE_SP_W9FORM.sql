USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserCBC]    Script Date: 9/7/2021 12:35:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateW9Form]
(		     @p_WId bigint
			,@p_Name nvarchar(500)
			,@p_BusinessName nvarchar(500)
			,@p_CompanyLiability bit
			,@p_IndividualProprietor bit
			,@p_CCorporation bit
			,@p_SCorporation bit
			,@p_Partnership bit
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
)

AS
UPDATE [dbo].[W9From]
   SET [Name] = @p_Name
      ,[BusinessName] = @p_BusinessName
      ,[CompanyLiability] = @p_CompanyLiability
      ,[IndividualProprietor] = @p_IndividualProprietor
      ,[CCorporation] = @p_CCorporation
      ,[SCorporation] = @p_SCorporation
      ,[Partnership] = @p_Partnership
      ,[PayeeCode] = @p_PayeeCode
      ,[ReportingCode] = @p_ReportingCode
      ,[StreetAddress] = @p_StreetAddress
      ,[AptNo] = @p_AptNo
      ,[ZipCode] = @p_ZipCode
      ,[City] = @p_City
      ,[StateName] = @p_StateName
      ,[AccountNumber] = @p_AccountNumber
      ,[RequesterNameAddress] = @p_RequesterNameAddress
      ,[SSN] = @p_SSN
      ,[EmployerIdNo] = @p_EmployerIdNo
      ,[Date] = @p_Date
WHERE WID = @p_WId
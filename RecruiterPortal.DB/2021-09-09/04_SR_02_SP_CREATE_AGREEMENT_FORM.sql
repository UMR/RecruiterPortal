USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertAgreementForm]    Script Date: 9/9/2021 5:28:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[sp_InsertAgreementForm] 
	-- Add the parameters for the stored procedure here
			 @p_UserID  bigint	
            ,@p_ContractorName nvarchar(500)
			,@p_StreetAddress nvarchar(500)
			,@p_ZipCode nvarchar(500)
			,@p_City nvarchar(500)
			,@p_StateName nvarchar(500)
			,@p_Notary nvarchar(500)
			,@p_Date datetime
		   
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[AgreementFrom]
	(
	            [ContractorName]
			   ,[StreetAddress]
			   ,[ZipCode]
			   ,[City]
			   ,[StateName]
			   ,[Notary]
			   ,[Date]
			   ,[UserID]
	)
	VALUES 
	( 
		@p_ContractorName
		,@p_StreetAddress 
		,@p_ZipCode 
		,@p_City 
		,@p_StateName
		,@p_Notary
		,@p_Date 
		,@p_UserID	
	)

END

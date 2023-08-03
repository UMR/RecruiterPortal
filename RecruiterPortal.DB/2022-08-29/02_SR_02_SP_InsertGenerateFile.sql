USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertAgreementForm]    Script Date: 8/29/2022 8:10:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_InsertGeneratedFile] 
	-- Add the parameters for the stored procedure here
			 @UserID  bigint	
            ,@FileData varbinary
			,@FIleName nvarchar(500)
			,@CreatedDate nvarchar(500)
			,@UpdatedDate nvarchar(500)
			,@TermplateID nvarchar(500)
			,@FileTypeCode nvarchar(500)
		   
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[GeneratedFiles]
           ([UserID]
           ,[FileData]
           ,[FIleName]
           ,[CreatedDate]
           ,[UpdatedDate]
           ,[TermplateID]
           ,[FileTypeCode]
		   )
	VALUES 
	( 
		@UserID
		,@FileData 
		,@FIleName 
		,@CreatedDate 
		,@UpdatedDate
		,@TermplateID
		,@FileTypeCode 
	)

END

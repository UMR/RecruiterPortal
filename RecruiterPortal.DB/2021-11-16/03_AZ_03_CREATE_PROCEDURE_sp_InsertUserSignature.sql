USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserSignature]    Script Date: 11/16/2021 12:18:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_InsertUserSignature]
	-- Add the parameters for the stored procedure here
	@SignatureName nvarchar(500),
	@UserID bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[UserSignature]
           (
			[SignatureName]           
           ,[UserID]
		   )
     VALUES
           (
			@SignatureName
           ,@UserID
		   )
END
GO

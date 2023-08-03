USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserLicense]    Script Date: 27-Nov-19 5:09:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_InsertUserLicense]
	-- Add the parameters for the stored procedure here
		@LicenseName nvarchar(200),
        @LicenseNo nvarchar(50),
        @ExpiryDate datetime,
		@UserID bigint      
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here	

	INSERT INTO [dbo].[UserLicense]
			   ([LicenseName]
			   ,[LicenseNo]
			   ,[ExpiryDate]
			   ,[UserID])
		 VALUES
			   (@LicenseName
			   ,@LicenseNo
			   ,@ExpiryDate
			   ,@UserID)
END

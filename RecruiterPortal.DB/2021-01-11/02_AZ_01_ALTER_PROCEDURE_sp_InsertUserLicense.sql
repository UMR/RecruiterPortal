USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserLicense]    Script Date: 01/11/2021 4:58:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[sp_InsertUserLicense]
	-- Add the parameters for the stored procedure here
		@LicenseName nvarchar(200),
        @LicenseNo nvarchar(50),
        @ExpiryDate datetime,
		@UserID bigint,
		@FileType tinyint = NULL,
		@FIleData varbinary(max) = NULL,
        @FileName nvarchar(512) = NULL,
        @IssuedDate datetime = NULL
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
			   ,[UserID]
			   ,[FileType]
			   ,[FIleData]
			   ,[FileName]
			   ,[IssuedDate])
		 VALUES
			   (@LicenseName
			   ,@LicenseNo
			   ,@ExpiryDate
			   ,@UserID
			   ,@FileType
			   ,@FIleData
			   ,@FileName
			   ,@IssuedDate)
END

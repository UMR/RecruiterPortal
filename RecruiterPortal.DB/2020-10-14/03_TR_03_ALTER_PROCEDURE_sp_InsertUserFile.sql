USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserFile]    Script Date: 10/14/2020 12:12:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[sp_InsertUserFile] 
	-- Add the parameters for the stored procedure here
		@p_FileType tinyint,
		@p_FileData varbinary(max),
        @p_FileName nvarchar(max),
        @p_CreatedDate datetime,
        @p_UserID bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[UserFile]
			   ([FileType]
			   ,[FIleData]
			   ,[FileName]
			   ,[CreatedDate]
			   ,[UserID])
		 VALUES
			   (@p_FileType,
			   @p_FileData,
			   @p_FileName,
			   @p_CreatedDate,
			   @p_UserID)


END

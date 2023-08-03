-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE sp_InsertUserFile 
	-- Add the parameters for the stored procedure here
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
			   ([FIleData]
			   ,[FileName]
			   ,[CreatedDate]
			   ,[UserID])
		 VALUES
			   (@p_FileData,
			   @p_FileName,
			   @p_CreatedDate,
			   @p_UserID)


END
GO

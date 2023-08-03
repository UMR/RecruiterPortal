USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserPhoto]    Script Date: 7/26/2023 7:44:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_InsertUserPhoto] 
		@Photo varbinary(max),
        @UserID bigint,
        @CreatedDate datetime
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[UserPhoto]
           ([Photo]
           ,[UserID]
           ,[CreatedDate])
		 VALUES
			   (@Photo,
			   @UserID,
			   @CreatedDate)


END

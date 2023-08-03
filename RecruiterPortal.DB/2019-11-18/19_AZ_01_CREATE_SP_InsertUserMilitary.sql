USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserMilitary]    Script Date: 18-Nov-19 8:41:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_InsertUserMilitary] 
	-- Add the parameters for the stored procedure here
	@p_Branch nvarchar (500),
	@p_FromDate datetime,
	@p_ToDate datetime,
	@p_RankAtDischarge nvarchar (150),
	@p_TypeOfDischarge bit,
	@p_DisonourComment nvarchar (500),	
	@p_UserID  bigint	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
INSERT INTO [dbo].[UserMilitary]
( 
	Branch,
	FromDate,
	ToDate,
	RankAtDischarge,
	TypeOfDischarge,
	DisonourComment,
	UserID	
)
VALUES 
(
	@p_Branch,
	@p_FromDate,
	@p_ToDate,
	@p_RankAtDischarge,
	@p_TypeOfDischarge,
	@p_DisonourComment,
	@p_UserID		
)

END

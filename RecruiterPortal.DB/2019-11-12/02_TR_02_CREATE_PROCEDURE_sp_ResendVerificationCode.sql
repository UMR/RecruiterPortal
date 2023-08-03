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
CREATE PROCEDURE sp_ResendVerificationCode 
	-- Add the parameters for the stored procedure here
	@p_UserID bigint,
	@p_VerficationCode nvarchar(10)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
UPDATE [UserVerification] 
	SET 
		Active = 0
	WHERE
		UserID = @p_UserID AND Active = 1
END

INSERT INTO [UserVerification]
( 
	UserID,
	CreatedDate,
	ExpiryDate,
	VerficationCode,
	Active

)
VALUES 
(
	@p_UserID,
	GETDATE(),
	DATEADD (hh , 5 , GETDATE() ),
	@p_VerficationCode,
	1
)


GO

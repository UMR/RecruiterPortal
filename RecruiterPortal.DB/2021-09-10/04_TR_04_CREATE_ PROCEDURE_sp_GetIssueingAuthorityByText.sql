-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[sp_GetIssueingAuthorityByText] 
	-- Add the parameters for the stored procedure here
	@IssueAuthority nvarchar(100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT TOP 10 * FROM View_IssueAuthority WHERE IssueAuthority LIKE ''+@IssueAuthority+'%'
END

GO
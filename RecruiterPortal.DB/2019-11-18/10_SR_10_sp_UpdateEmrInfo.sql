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
CREATE PROCEDURE dbo.sp_UpdateEmrInfo
	-- Add the parameters for the stored procedure here
	@p_EmrLastName nvarchar (30),
	@p_EmrFirstName nvarchar (30),
	@p_NatureOfRelationship nvarchar (50),
	@p_EmrHomePhone nvarchar (50),
	@p_EmrCellPhone nvarchar (50),
	@p_EmrWorkPhone nvarchar (50),
	@p_EmrType  tinyint,
	@p_UserID  bigint
AS
BEGIN
	UPDATE [dbo].[UserEmergencyInfo]
   SET [EmrLastName] = @p_EmrLastName
      ,[EmrFirstName] = @p_EmrFirstName
      ,[NatureOfRelationship] = @p_NatureOfRelationship
      ,[EmrCellPhone] = @p_EmrCellPhone
      ,[EmrHomePhone] = @p_EmrHomePhone
      ,[EmrWorkPhone] = @p_EmrWorkPhone
 WHERE [UserID]=@p_UserID AND [EmrType]=@p_EmrType
END
GO

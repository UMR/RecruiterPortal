USE [UMRRecruitmentApplicant]
GO
-- ================================================
-- Template generated from Template Explorer using:
-- Create Trigger (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- See additional Create Trigger templates for more
-- examples of different Trigger statements.
--
-- This block of comments will not be included in
-- the definition of the function.
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
CREATE TRIGGER Update_ChangeTracker
   ON  [dbo].[AgreementFrom] 
	WITH EXECUTE AS CALLER
	FOR UPDATE, INSERT
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE [dbo].[ChangeTracker]
	SET [HasNewChanges] = 1
		,[ChangeDate] = GETDATE()
	WHERE [UserID] IN (SELECT INSERTED.[UserID] FROM INSERTED)

    -- Insert statements for trigger here

END
GO

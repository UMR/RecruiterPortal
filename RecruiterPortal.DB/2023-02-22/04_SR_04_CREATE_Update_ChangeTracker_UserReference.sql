USE [UMRRecruitmentApplicant]
GO
/****** Object:  Trigger [dbo].[Update_ChangeTracker_UserReference]    Script Date: 2/22/2023 6:01:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[Update_ChangeTracker_UserReference]
   ON  [dbo].[UserReference] 
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

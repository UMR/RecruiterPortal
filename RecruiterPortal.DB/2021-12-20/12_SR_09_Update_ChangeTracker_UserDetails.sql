﻿USE [UMRRecruitmentApplicant]
GO
/****** Object:  Trigger [dbo].[Update_ChangeTracker_UserDetails]    Script Date: 12/20/2021 2:00:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[Update_ChangeTracker_UserDetails]
   ON  [dbo].[UserDetails] 
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

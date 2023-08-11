USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_ValidateRecruiter]    Script Date: 8/11/2023 12:24:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_ValidateRecruiter]  
   @LoginId NVARCHAR(50), 
   @Password NVARCHAR(200),
   @AgencyId BIGINT
AS 
BEGIN   
		SELECT * FROM [Recruiter] WHERE LoginId = @LoginId AND [Password] = @Password AND AgencyId=@AgencyId;
END

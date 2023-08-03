USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[SP_USERVALIDATE]    Script Date: 1/30/2023 2:05:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].SP_USERVALIDATEWithAgencyId  
   @p_Email NVARCHAR(1000), 
   @p_Password NVARCHAR(1000),
   @p_AgencyId int
AS 
BEGIN      

		Declare @userKey bigint;
		SET @userKey = -666;
		SELECT * FROM [User] WHERE  [User].Email = @p_Email AND [User].[Password] = @p_Password AND [User].AgencyId = @p_AgencyId;
END

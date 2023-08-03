USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdatePasswordByEmail]    Script Date: 11/15/2019 7:01:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_UpdatePasswordByEmail]
(
	@p_Email nvarchar (MAX),
	@p_Password nvarchar (MAX)
)

AS
UPDATE [User] 
SET 
[Password] = @p_Password
WHERE
Email = @p_Email
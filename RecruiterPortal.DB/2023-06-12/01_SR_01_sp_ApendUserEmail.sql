USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUser]    Script Date: 6/12/2023 8:07:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_ApendUserEmail]
(
	@p_Email nvarchar (MAX),
	@p_UpdateEmail nvarchar(MAX)
)

AS
UPDATE [User] 
SET 
Email = @p_UpdateEmail
WHERE
Email = @p_Email


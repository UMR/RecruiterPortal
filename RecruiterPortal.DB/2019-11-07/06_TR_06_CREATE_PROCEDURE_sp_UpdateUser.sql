SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE dbo.sp_UpdateUser
(
	@p_UserID bigint,
	@p_First_Name nvarchar (MAX),
	@p_Last_Name nvarchar (MAX),
	@p_Email nvarchar (MAX),
	@p_Password nvarchar (MAX),
	@p_Middle_Name nvarchar (MAX),
	@p_IsVerified bit
)

AS
UPDATE [User] 
SET 
First_Name = @p_First_Name,
Last_Name = @p_Last_Name,
Email = @p_Email,
[Password] = @p_Password,
Middle_Name = @p_Middle_Name,
IsVerified = @p_IsVerified

WHERE
UserID = @p_UserID


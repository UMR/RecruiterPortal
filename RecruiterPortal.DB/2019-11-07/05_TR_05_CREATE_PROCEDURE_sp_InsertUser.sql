SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE dbo.sp_InsertUser
(
	@p_First_Name nvarchar (MAX),
	@p_Last_Name nvarchar (MAX),
	@p_Email nvarchar (MAX),
	@p_Password nvarchar (MAX),
	@p_Middle_Name nvarchar (MAX),
	@p_IsVerified bit,
	@p_UserID  bigint OUTPUT
)	 

AS
INSERT INTO [User]
( 
	First_Name,
	Last_Name,
	Email,
	[Password],
	Middle_Name,
	IsVerified

)
VALUES 
(
	@p_First_Name,
	@p_Last_Name,
	@p_Email,
	@p_Password,
	@p_Middle_Name,
	@p_IsVerified
)	 


SET @p_UserID= @@IDENTITY
 Return @p_UserID
/*DROP PROC dbo.sp_InsertUser*/
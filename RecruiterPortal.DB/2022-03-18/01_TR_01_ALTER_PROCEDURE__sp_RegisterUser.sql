USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_RegisterUser]    Script Date: 3/18/2022 11:03:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_RegisterUser]
(
	@p_First_Name nvarchar (30),
	@p_Last_Name nvarchar (30),
	@p_Email nvarchar (200),
	@p_Password nvarchar (500),
	@p_Middle_Name nvarchar (200),
	@p_IsVerified bit,
	@p_VerficationCode nvarchar(10),
	@p_UserID  bigint OUTPUT
)

AS
DECLARE @MyTableVar table (UserID bigint);

INSERT INTO [User]
( 
	First_Name,
	Last_Name,
	Email,
	[Password],
	Middle_Name,
	IsVerified

)
output INSERTED.[UserID] into @MyTableVar
VALUES 
(
	@p_First_Name,
	@p_Last_Name,
	@p_Email,
	@p_Password,
	@p_Middle_Name,
	@p_IsVerified
)


SELECT @p_UserID = UserID FROM @MyTableVar

INSERT INTO [UserVerification]
( 
	UserID,
	CreatedDate,
	ExpiryDate,
	VerficationCode,
	Active

)
VALUES 
(
	@p_UserID,
	GETDATE(),
	DATEADD (hh , 5 , GETDATE() ),
	@p_VerficationCode,
	1
)

INSERT INTO [dbo].[ChangeTracker]
( 
           [HasNewChanges]
           ,[ChangeDate]
           ,[ImportDate]
           ,[UserID]
)
VALUES 
(
	0,
	GETDATE(),
	GETDATE(),
	@p_UserID
)



 RETURN @p_UserID
/*DROP PROC dbo.sp_InsertUser*/
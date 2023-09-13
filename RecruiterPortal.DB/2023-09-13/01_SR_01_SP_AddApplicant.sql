﻿USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_RegisterUser]    Script Date: 9/13/2023 2:14:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_AddApplicant]
(
	@p_FirstName nvarchar (30),
	@p_LastName nvarchar (30),
	@p_Email nvarchar (200),
	@p_Password nvarchar (500),
	@p_MiddleName nvarchar (200),
	@p_IsVerified bit,
	--@p_VerficationCode nvarchar(10),
	@p_AgencyId  int,
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
	IsVerified,
	AgencyId

)
output INSERTED.[UserID] into @MyTableVar
VALUES 
(
	@p_FirstName,
	@p_LastName,
	@p_Email,
	@p_Password,
	@p_MiddleName,
	@p_IsVerified,
	@p_AgencyId
)


SELECT @p_UserID = UserID FROM @MyTableVar

--INSERT INTO [UserVerification]
--( 
--	UserID,
--	CreatedDate,
--	ExpiryDate,
--	VerficationCode,
--	Active

--)
--VALUES 
--(
--	@p_UserID,
--	GETDATE(),
--	DATEADD (hh , 5 , GETDATE() ),
--	@p_VerficationCode,
--	1
--)

 RETURN @p_UserID

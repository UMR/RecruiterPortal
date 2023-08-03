USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserReferenceByUserReferenceID]    Script Date: 2/8/2023 5:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_UpdateUserReferenceByUserReferenceID]
(
	@RefLastName nvarchar(30),
	@RefFirstName nvarchar(30),
	@RefMiddleName nvarchar(30) = null,
	@ReferenceType nvarchar(100) = null,
	@NatureOfRelationship nvarchar(50) = null,
	@CompanyName nvarchar(500) = null,
	@EMInstituteID bigint = null,
	@RefPhone nvarchar(50),
	@RefEmail nvarchar(100),
	@RefAddress nvarchar(500) = null,
	@UserID bigint,	
	@UserReferenceID bigint
)
AS
	SET NOCOUNT OFF;
	UPDATE [UserReference] SET [RefLastName] = @RefLastName, [RefFirstName] = @RefFirstName, [RefMiddleName] = @RefMiddleName, [ReferenceType] = @ReferenceType,
	[NatureOfRelationship] = @NatureOfRelationship, [CompanyName] = @CompanyName, [EMInstituteID] = @EMInstituteID, [RefPhone] = @RefPhone,[RefEmail] = @RefEmail, [RefAddress] = @RefAddress, 
	[UserID] = @UserID WHERE (([UserReferenceID] = @UserReferenceID));
	
	SELECT * FROM UserReference WHERE (UserReferenceID = @UserReferenceID)

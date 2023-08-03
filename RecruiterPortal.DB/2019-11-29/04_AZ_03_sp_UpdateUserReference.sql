USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserReferenceByUserReferenceID]    Script Date: 28-Nov-19 6:53:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_UpdateUserReferenceByUserReferenceID]
(
	@RefLastName nvarchar(30),
	@RefFirstName nvarchar(30),
	@RefMiddleName nvarchar(30) = null,
	@NatureOfRelationship nvarchar(50) = null,
	@CompanyName nvarchar(500) = null,
	@EMInstituteID bigint = null,
	@RefPhone nvarchar(50),
	@RefAddress nvarchar(500) = null,
	@UserID bigint,	
	@UserReferenceID bigint
)
AS
	SET NOCOUNT OFF;
	UPDATE [UserReference] SET [RefLastName] = @RefLastName, [RefFirstName] = @RefFirstName, [RefMiddleName] = @RefMiddleName, [NatureOfRelationship] = @NatureOfRelationship, [CompanyName] = @CompanyName, [EMInstituteID] = @EMInstituteID, [RefPhone] = @RefPhone, [RefAddress] = @RefAddress, [UserID] = @UserID WHERE (([UserReferenceID] = @UserReferenceID));
	
	SELECT UserReferenceID, RefLastName, RefFirstName, RefMiddleName, NatureOfRelationship, CompanyName, EMInstituteID, RefPhone, RefAddress, UserID, CreatedDate FROM UserReference WHERE (UserReferenceID = @UserReferenceID)

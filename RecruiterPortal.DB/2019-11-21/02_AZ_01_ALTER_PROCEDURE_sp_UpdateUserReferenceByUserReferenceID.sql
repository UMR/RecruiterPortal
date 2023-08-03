USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserReferenceByUserReferenceID]    Script Date: 21-Nov-19 1:44:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_UpdateUserReferenceByUserReferenceID]
(
	@RefLastName nvarchar(30),
	@RefFirstName nvarchar(30),
	@RefMiddleName nvarchar(30),
	@NatureOfRelationship nvarchar(50),
	@CompanyName nvarchar(500),
	@EMInstituteID bigint,
	@RefPhone nvarchar(50),
	@RefAddress nvarchar(500),
	@UserID bigint,	
	@UserReferenceID bigint
)
AS
	SET NOCOUNT OFF;
	UPDATE [UserReference] SET [RefLastName] = @RefLastName, [RefFirstName] = @RefFirstName, [RefMiddleName] = @RefMiddleName, [NatureOfRelationship] = @NatureOfRelationship, [CompanyName] = @CompanyName, [EMInstituteID] = @EMInstituteID, [RefPhone] = @RefPhone, [RefAddress] = @RefAddress, [UserID] = @UserID WHERE (([UserReferenceID] = @UserReferenceID));
	
	SELECT UserReferenceID, RefLastName, RefFirstName, RefMiddleName, NatureOfRelationship, CompanyName, EMInstituteID, RefPhone, RefAddress, UserID, CreatedDate FROM UserReference WHERE (UserReferenceID = @UserReferenceID)

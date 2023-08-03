USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserReference]    Script Date: 28-Nov-19 6:49:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertUserReference]
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
	@CreatedDate datetime
)
AS
	SET NOCOUNT OFF;
	INSERT INTO [UserReference] ([RefLastName], [RefFirstName], [RefMiddleName], [NatureOfRelationship], [CompanyName], [EMInstituteID], [RefPhone], [RefAddress], [UserID], [CreatedDate]) VALUES (@RefLastName, @RefFirstName, @RefMiddleName, @NatureOfRelationship, @CompanyName, @EMInstituteID, @RefPhone, @RefAddress, @UserID, @CreatedDate);
	
	SELECT UserReferenceID, RefLastName, RefFirstName, RefMiddleName, NatureOfRelationship, CompanyName, EMInstituteID, RefPhone, RefAddress, UserID, CreatedDate FROM UserReference WHERE (UserReferenceID = SCOPE_IDENTITY())

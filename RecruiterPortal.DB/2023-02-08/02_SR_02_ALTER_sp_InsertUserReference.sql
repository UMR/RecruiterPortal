USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserReference]    Script Date: 2/8/2023 5:16:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertUserReference]
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
	@CreatedDate datetime
)
AS
	SET NOCOUNT OFF;
	INSERT INTO [UserReference] ([RefLastName], [RefFirstName], [RefMiddleName],[ReferenceType], [NatureOfRelationship], [CompanyName], [EMInstituteID], 
	[RefPhone],[RefEmail], [RefAddress], [UserID], [CreatedDate]) VALUES (@RefLastName, @RefFirstName, @RefMiddleName,@ReferenceType, @NatureOfRelationship,
	@CompanyName, @EMInstituteID, @RefPhone,@RefEmail, @RefAddress, @UserID, @CreatedDate);
	
	SELECT * FROM UserReference WHERE (UserReferenceID = SCOPE_IDENTITY())

USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertRecruiter]    Script Date: 9/5/2023 5:42:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertRecruiter]
(
	@LoginId nvarchar(50),
	@FirstName nvarchar(50),
	@LastName nvarchar(50),
	@Password nvarchar(50),
	@Email nvarchar(50),
	@Telephone nvarchar(15),
	@IsActive nvarchar(50),
	@CreatedBy int,
	@CreatedDate datetime,
	@AgencyID int
)
AS
	SET NOCOUNT OFF;

INSERT INTO [dbo].[Recruiter]
           ([LoginId]
           ,[FirstName]
           ,[LastName]
           ,[Password]
           ,[Email]
           ,[Telephone]
           ,[ODAPermission]
           ,[IsActive]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[TimeOut]
           ,[AgencyID])
     VALUES
           (@LoginId
           ,@FirstName
           ,@LastName
           ,@Password
           ,@Email
           ,@Telephone
           ,1
           ,@IsActive
           ,@CreatedBy
           ,@CreatedDate
           ,14400
           ,(SELECT [AgencyID] FROM [Recruiter] where RecruiterId=@CreatedBy))

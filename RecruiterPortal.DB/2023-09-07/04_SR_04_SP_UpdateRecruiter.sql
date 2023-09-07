USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateRecruiter]    Script Date: 9/7/2023 9:08:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_UpdateRecruiter]
(
	@FirstName nvarchar(50),
	@LastName nvarchar(50),
	@Email nvarchar(50),
	@Telephone nvarchar(15),
	@IsActive nvarchar(50),
	@UpdateBy int,
	@UpdatedDate datetime,
	@RecruiterId int
)
AS
	SET NOCOUNT OFF;

UPDATE [dbo].[Recruiter]
   SET [FirstName] = @FirstName
      ,[LastName] = @LastName
      ,[Email] = @Email
      ,[Telephone] = @Telephone
      ,[IsActive] = @IsActive
      ,[UpdatedBy] = @UpdateBy
      ,[UpdatedDate] = @UpdatedDate
 WHERE [RecruiterId] = @RecruiterId

USE [UMRRecruitmentApplicant]
GO

CREATE PROCEDURE [dbo].[sp_UpdateEducation]
(
	@SchoolName nvarchar(500),
    @SchoolAddress nvarchar(500),
    @Degree nvarchar(500),
    @FromDate datetime,
    @ToDate datetime,
    @IsGraduate bit,
    @UserID bigint,
    @InstitutionType tinyint
)

AS

INSERT INTO [dbo].[UserEducation]
           ([SchoolName]
           ,[SchoolAddress]
           ,[Degree]
           ,[FromDate]
           ,[ToDate]
           ,[IsGraduate]
           ,[UserID]
           ,[InstitutionType])
     VALUES
           (@SchoolName
           ,@SchoolAddress
           ,@Degree
           ,@FromDate
           ,@ToDate
           ,@IsGraduate
           ,@UserID
           ,@InstitutionType)
GO



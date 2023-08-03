USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserLicense]    Script Date: 1/4/2023 2:33:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sp_UpdateUserLicense]
(
	@LicenseID bigint,
    @LicenseNameA nvarchar(200),
	@LicenseNameB nvarchar(200),
	@LicenseNameC nvarchar(200),
    @LicenseNo nvarchar(50),
    @ExpiryDate datetime,    
    @UserID bigint,
	@FileType tinyint = NULL,
	@FIleData varbinary(max) = NULL,
    @FileName nvarchar(512) = NULL,
    @IssuedDate datetime = NULL,
    @IssueAuthority varchar(100) = NULL,
    @StateCode char(3) = NULL
)

AS

SELECT @StateCode= StateAbbr FROM dbo.View_LookUp_ZipCode WHERE StateName = @IssueAuthority

UPDATE [dbo].[UserLicense] SET  [LicenseNameA] = @LicenseNameA,
						[LicenseNameB] = @LicenseNameB,
						[LicenseNameC] = @LicenseNameC,
						[LicenseNo] = @LicenseNo,
						[ExpiryDate] = @ExpiryDate,
						[UserID] = @UserID,
						[FileType] = @FileType,
						[FIleData] = @FIleData,
						[FileName] = @FileName,
						[IssuedDate] = @IssuedDate,
						IssueAuthority = @IssueAuthority,
						StateCode = @StateCode
						WHERE LicenseID = @LicenseID
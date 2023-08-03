USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserLicense]    Script Date: 9/10/2021 1:33:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_UpdateUserLicense]
(
	@LicenseID bigint,
    @LicenseName nvarchar(200),
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

UPDATE [dbo].[UserLicense] SET  [LicenseName] = @LicenseName,
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
USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserLicense]    Script Date: 01/11/2021 5:09:40 PM ******/
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
    @IssuedDate datetime = NULL
)

AS

UPDATE [dbo].[UserLicense] SET  [LicenseName] = @LicenseName,
						[LicenseNo] = @LicenseNo,
						[ExpiryDate] = @ExpiryDate,
						[UserID] = @UserID,
						[FileType] = @FileType,
						[FIleData] = @FIleData,
						[FileName] = @FileName,
						[IssuedDate] = @IssuedDate
						WHERE LicenseID = @LicenseID

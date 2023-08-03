CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateUserLicense]
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

SELECT @StateCode= StateAbbr FROM dbo.View_LookUp_ZipCode WHERE StateName = @IssueAuthority

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
GO


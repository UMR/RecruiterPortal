USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateEducation]    Script Date: 28-Nov-19 1:02:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_UpdateUserLicense]
(
	@LicenseID bigint,
    @LicenseName nvarchar(200),
    @LicenseNo nvarchar(50),
    @ExpiryDate datetime,    
    @UserID bigint    
)

AS

UPDATE [dbo].[UserLicense] SET  LicenseName = @LicenseName,
						LicenseNo = @LicenseNo,
						ExpiryDate = @ExpiryDate,
						UserID = @UserID

					WHERE LicenseID = @LicenseID

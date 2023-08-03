-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[sp_InsertUserLicense]
	-- Add the parameters for the stored procedure here
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
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT @StateCode= StateAbbr FROM dbo.View_LookUp_ZipCode WHERE StateName = @IssueAuthority
    -- Insert statements for procedure here	
    
    DECLARE @InsertedIDResults table (ID BIGINT);

	INSERT INTO [dbo].[UserLicense]
			   ([LicenseName]
			   ,[LicenseNo]
			   ,[ExpiryDate]
			   ,[UserID]
			   ,[FileType]
			   ,[FIleData]
			   ,[FileName]
			   ,[IssuedDate]
			   ,[IssueAuthority]
			   ,[StateCode])
	OUTPUT INSERTED.LicenseID INTO @InsertedIDResults
		 VALUES
			   (@LicenseName
			   ,@LicenseNo
			   ,@ExpiryDate
			   ,@UserID
			   ,@FileType
			   ,@FIleData
			   ,@FileName
			   ,@IssuedDate
			   ,@IssueAuthority
			   ,@StateCode)

	DECLARE @InsertedID BIGINT = (SELECT TOP 1 ID FROM @InsertedIDResults);
	 DECLARE @p_IsExits AS BIT
	 DECLARE @p_ApplicantID AS INT
	 DECLARE @p_CreatedBy AS INT

	 SELECT @p_IsExits = COUNT([ApplicantID]) FROM [UMRRecruitementDB_New].[dbo].[ImportedApplicant] WHERE [ApplicantPortalUserID] = @UserID
	 IF @p_IsExits > 0
		BEGIN 
			SELECT @p_ApplicantID = [ApplicantID], @p_CreatedBy = [CreatedBy] FROM [UMRRecruitementDB_New].[dbo].[ImportedApplicant] WHERE [ApplicantPortalUserID] = @UserID
			DECLARE @p_ApplicantCertification AS INT
			   
			INSERT INTO [UMRRecruitementDB_New].[dbo].[ApplicantCertification]
								([ApplicantID]
								,[Certification]
								,[Type]
								,[Number]
								,[IssuedDate]
								,[ExpiresDate]
								,[FileData]
								,[FileName]
								,[CreatedBy]
								,[CreatedDate]
								,[IssueAuthority]
								,[StateCode]
								,[LicenseID])
							VALUES
								(@p_ApplicantID
								,@LicenseName
								,CONVERT(varchar(50), @FileType)
								,@LicenseNo
								,@IssuedDate
								,@ExpiryDate
								,@FIleData
								,@FileName
                                ,@p_CreatedBy
                                ,GETDATE()
								,@IssueAuthority
								,@StateCode
								,@InsertedID)

			SELECT @p_ApplicantCertification = SCOPE_IDENTITY();
			DECLARE @p_IsExitsApplicantProfileMaster AS BIT
			DECLARE @p_IsExitsApplicantProfileDetail AS BIT
			DECLARE @p_ProfileTemplateMasterID AS INT
			DECLARE @p_ProfileTemplateDetailID AS INT

			SELECT @p_IsExitsApplicantProfileMaster = COUNT([ApplicantID]) FROM [UMRRecruitementDB_New].[dbo].[ApplicantTemplateMasterProfile] WHERE [ApplicantID] = @p_ApplicantID
				 IF @p_IsExitsApplicantProfileMaster > 0
					BEGIN
						SELECT TOP 1 @p_ProfileTemplateMasterID = ProfileTemplateMasterID FROM [UMRRecruitementDB_New].[dbo].[ApplicantTemplateMasterProfile] WHERE [ApplicantID] = @p_ApplicantID
						SELECT @p_IsExitsApplicantProfileDetail = COUNT(ProfileTemplateDetailID) FROM [UMRRecruitementDB_New].[dbo].[ProfileTemplateDetail] WHERE [ProfileTemplateMasterID] = @p_ProfileTemplateMasterID AND [FileType] = @FileType
						IF @p_IsExitsApplicantProfileDetail > 0
							BEGIN
								SELECT @p_ProfileTemplateDetailID = ProfileTemplateDetailID FROM [UMRRecruitementDB_New].[dbo].[ProfileTemplateDetail] WHERE [ProfileTemplateMasterID] = @p_ProfileTemplateMasterID AND [FileType] = @FileType

								INSERT INTO [UMRRecruitementDB_New].[dbo].[ApplicantProfile]
									   ([ProfileTemplateDetailID]
									   ,[ProfileTemplateMasterID]
									   ,[ApploicantAttachmentID]
									   ,[ApplicantCertificationID]
									   ,[ApplicantID]
									   ,[CreatedBy]
									   ,[CreatedDate])
								 VALUES
									   (@p_ProfileTemplateDetailID
									   ,@p_ProfileTemplateMasterID
									   ,NULL
									   ,@p_ApplicantCertification
									   ,@p_ApplicantID
									   ,@p_CreatedBy
									   ,GETDATE())

							END
					END
		END

END
GO


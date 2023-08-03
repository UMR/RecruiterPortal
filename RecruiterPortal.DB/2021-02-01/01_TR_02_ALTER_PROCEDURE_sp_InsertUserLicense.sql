USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserLicense]    Script Date: 1/25/2021 3:25:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[sp_InsertUserLicense]
	-- Add the parameters for the stored procedure here
		@LicenseName nvarchar(200),
        @LicenseNo nvarchar(50),
        @ExpiryDate datetime,
		@UserID bigint,
		@FileType tinyint = NULL,
		@FIleData varbinary(max) = NULL,
        @FileName nvarchar(512) = NULL,
        @IssuedDate datetime = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here	

	INSERT INTO [dbo].[UserLicense]
			   ([LicenseName]
			   ,[LicenseNo]
			   ,[ExpiryDate]
			   ,[UserID]
			   ,[FileType]
			   ,[FIleData]
			   ,[FileName]
			   ,[IssuedDate])
		 VALUES
			   (@LicenseName
			   ,@LicenseNo
			   ,@ExpiryDate
			   ,@UserID
			   ,@FileType
			   ,@FIleData
			   ,@FileName
			   ,@IssuedDate)


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
								,[CreatedDate])
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
                                ,GETDATE())

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
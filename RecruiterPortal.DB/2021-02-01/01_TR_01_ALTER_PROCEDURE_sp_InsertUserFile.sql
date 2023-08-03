USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertUserFile]    Script Date: 1/25/2021 2:58:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[sp_InsertUserFile] 
	-- Add the parameters for the stored procedure here
		@p_FileType tinyint,
		@p_FileData varbinary(max),
        @p_FileName nvarchar(max),
        @p_CreatedDate datetime,
        @p_UserID bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[UserFile]
			   ([FileType]
			   ,[FIleData]
			   ,[FileName]
			   ,[CreatedDate]
			   ,[UserID])
		 VALUES
			   (@p_FileType,
			   @p_FileData,
			   @p_FileName,
			   @p_CreatedDate,
			   @p_UserID)
	
	 DECLARE @p_IsExits AS BIT
	 DECLARE @p_ApplicantID AS INT
	 DECLARE @p_CreatedBy AS INT
	 DECLARE @p_ApplicantCertification AS INT = NULL
	 DECLARE @p_ApplicantAttachment AS INT = NULL


	 SELECT @p_IsExits = COUNT([ApplicantID]) FROM [UMRRecruitementDB_New].[dbo].[ImportedApplicant] WHERE [ApplicantPortalUserID] = @p_UserID
	 IF @p_IsExits > 0
		BEGIN 
			SELECT @p_ApplicantID = [ApplicantID], @p_CreatedBy = [CreatedBy] FROM [UMRRecruitementDB_New].[dbo].[ImportedApplicant] WHERE [ApplicantPortalUserID] = @p_UserID
			   IF @p_FileType = 3
					BEGIN 
						INSERT INTO [UMRRecruitementDB_New].[dbo].[ApplicantAttachment]
										   ([ApplicantId]
										   ,[Title]
										   ,[Type]
										   ,[FileName]
										   ,[FileData]
										   ,[ResumeStatus]
										   ,[CreatedBy]
										   ,[CreatedDate])
									VALUES
										   (@p_ApplicantID
										   ,@p_FileName
										   ,1
										   ,@p_FileName
										   ,@p_FileData
										   ,1
										   ,@p_CreatedBy
										   ,GETDATE())

						SELECT @p_ApplicantAttachment= SCOPE_IDENTITY();
					END
			   ELSE
					BEGIN 
						INSERT INTO [UMRRecruitementDB_New].[dbo].[ApplicantCertification]
										   ([ApplicantID]
										   ,[Certification]
										   ,[Type]
										   ,[FileData]
										   ,[FileName]
										   ,[CreatedBy]
										   ,[CreatedDate])
									 VALUES
										   (@p_ApplicantID
										   ,@p_FileName
										   , CONVERT(varchar(50), @p_FileType)
										   ,@p_FileData
										   ,@p_FileName
										   ,@p_CreatedBy
										   ,GETDATE())

						SELECT @p_ApplicantCertification = SCOPE_IDENTITY();
					END

			DECLARE @p_IsExitsApplicantProfileMaster AS BIT
			DECLARE @p_IsExitsApplicantProfileDetail AS BIT
			DECLARE @p_ProfileTemplateMasterID AS INT
			DECLARE @p_ProfileTemplateDetailID AS INT

			SELECT @p_IsExitsApplicantProfileMaster = COUNT([ApplicantID]) FROM [UMRRecruitementDB_New].[dbo].[ApplicantTemplateMasterProfile] WHERE [ApplicantID] = @p_ApplicantID
					IF @p_IsExitsApplicantProfileMaster > 0
					BEGIN
						SELECT TOP 1 @p_ProfileTemplateMasterID = ProfileTemplateMasterID FROM [UMRRecruitementDB_New].[dbo].[ApplicantTemplateMasterProfile] WHERE [ApplicantID] = @p_ApplicantID
						SELECT @p_IsExitsApplicantProfileDetail = COUNT(ProfileTemplateDetailID) FROM [UMRRecruitementDB_New].[dbo].[ProfileTemplateDetail] WHERE [ProfileTemplateMasterID] = @p_ProfileTemplateMasterID AND [FileType] = @p_FileType
						IF @p_IsExitsApplicantProfileDetail > 0
						BEGIN
							SELECT @p_ProfileTemplateDetailID = ProfileTemplateDetailID FROM [UMRRecruitementDB_New].[dbo].[ProfileTemplateDetail] WHERE [ProfileTemplateMasterID] = @p_ProfileTemplateMasterID AND [FileType] = @p_FileType
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
									,@p_ApplicantAttachment
									,@p_ApplicantCertification
									,@p_ApplicantID
									,@p_CreatedBy
									,GETDATE())
						END
					END
		END
			   


END

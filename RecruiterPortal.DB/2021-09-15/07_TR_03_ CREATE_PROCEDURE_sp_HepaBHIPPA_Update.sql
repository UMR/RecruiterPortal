USE [UMRRecruitmentApplicant]
GO
-- Update:
 
 CREATE OR ALTER PROCEDURE sp_HepaBHIPPA_Update (
 	 @HepaBHIPPAID bigint
 	,@HasHepaConcent bit
 	,@HasHepaSheet bit
 	,@HasHepaTraining bit
 	,@IsExamined bit
 	,@HasNoCostHepa bit
 	,@HasFacilityInfo bit
 	,@Comment nvarchar(500)
 	,@SignatureDate datetime
 	,@WitnessName nvarchar(100)
 	,@WitnessSignatureDate datetime
    ,@ComplianceOfficer nvarchar(100)
 	,@UserID bigint
 )
 AS
 UPDATE [HepaBHIPPA]
 SET [HasHepaConcent] = @HasHepaConcent
 	,[HasHepaSheet] = @HasHepaSheet
 	,[HasHepaTraining] = @HasHepaTraining
 	,[IsExamined] = @IsExamined
 	,[HasNoCostHepa] = @HasNoCostHepa
 	,[HasFacilityInfo] = @HasFacilityInfo
 	,[Comment] = @Comment
 	,[SignatureDate] = @SignatureDate
 	,[WitnessName] = @WitnessName
 	,[WitnessSignatureDate] = @WitnessSignatureDate
 	,[ComplianceOfficer] = @ComplianceOfficer
 	,[UserID] = @UserID
 WHERE [HepaBHIPPAID] = @HepaBHIPPAID
 
 GO
 
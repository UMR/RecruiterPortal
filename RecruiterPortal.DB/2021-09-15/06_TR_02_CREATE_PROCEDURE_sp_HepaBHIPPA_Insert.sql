USE [UMRRecruitmentApplicant]
GO
 -- Insert:
 
 CREATE OR ALTER PROCEDURE sp_HepaBHIPPA_Insert (
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
 INSERT INTO [HepaBHIPPA] (
 	 [HasHepaConcent]
 	,[HasHepaSheet]
 	,[HasHepaTraining]
 	,[IsExamined]
 	,[HasNoCostHepa]
 	,[HasFacilityInfo]
 	,[Comment]
 	,[SignatureDate]
 	,[WitnessName]
 	,[WitnessSignatureDate]
 	,[ComplianceOfficer]
 	,[UserID]
 )
 VALUES (
 	 @HasHepaConcent
 	,@HasHepaSheet
 	,@HasHepaTraining
 	,@IsExamined
 	,@HasNoCostHepa
 	,@HasFacilityInfo
 	,@Comment
 	,@SignatureDate
 	,@WitnessName
 	,@WitnessSignatureDate
 	,@ComplianceOfficer
 	,@UserID
 )
 GO
USE [UMRRecruitmentApplicant]
GO
-- Delete:
 
 CREATE OR ALTER PROCEDURE sp_HepaBHIPPA_Delete (
 	 @HepaBHIPPAID bigint
 )
 AS
 DELETE
 FROM [HepaBHIPPA]
 WHERE [HepaBHIPPAID] = @HepaBHIPPAID
 
 GO
USE [UMRRecruitmentApplicant]
GO
-- Select:
 
 CREATE OR ALTER PROCEDURE sp_HepaBHIPPA_Select (
 	 @UserID bigint
 )
 AS
 SELECT  * FROM [HepaBHIPPA] WHERE [UserID] = @UserID
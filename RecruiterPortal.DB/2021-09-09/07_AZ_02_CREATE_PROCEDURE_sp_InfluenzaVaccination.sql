USE [UMRRecruitmentApplicant]
GO

/****** Object:  StoredProcedure [dbo].[sp_InfluenzaVaccination] Script Date: 9/06/2021 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE OR ALTER PROCEDURE [dbo].[sp_InsertInfluenzaVaccination]	
	@FacilityName nvarchar(500) NULL,
	@ReasonDeclination nvarchar(500) NULL,
	@Signature nvarchar(500) NULL,
	@EntryDate datetime NULL,	
	@Name nvarchar(500) NULL,
	@Department nvarchar(500) NULL,
	@UserID bigint,
	@CreatedDate datetime
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
INSERT INTO [dbo].[InfluenzaVaccination]
           (		    
			 [FacilityName] 
			,[ReasonDeclination]
			,[Signature]
			,[EntryDate]
			,[Name] 
			,[Department] 
			,[UserID] 
			,[CreatedDate]
		  )
     VALUES
           (
		     @FacilityName
			,@ReasonDeclination
			,@Signature
			,@EntryDate
			,@Name
			,@Department
			,@UserID
			,@CreatedDate
		  )
END
GO

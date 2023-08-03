USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertEmrInfo]    Script Date: 11/19/2019 4:45:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertEmrInfo]
(
	@p_EmrLastName nvarchar (30),
	@p_EmrFirstName nvarchar (30),
	@p_NatureOfRelationship nvarchar (50),
	@p_EmrHomePhone nvarchar (50),
	@p_EmrCellPhone nvarchar (50),
	@p_EmrWorkPhone nvarchar (50),
	@p_EmrType  tinyint,
	@p_UserID  bigint
)	 

AS
INSERT INTO [UserEmergencyInfo]
( 
	EmrLastName,
	EmrFirstName,
	NatureOfRelationship,
	EmrHomePhone,
	EmrCellPhone,
	EmrWorkPhone,
	EmrType,
	UserID
)
VALUES 
(
	@p_EmrLastName,
	@p_EmrFirstName,
	@p_NatureOfRelationship,
	@p_EmrHomePhone,
	@p_EmrCellPhone,
	@p_EmrWorkPhone,
	@p_EmrType,
	@p_UserID
)	
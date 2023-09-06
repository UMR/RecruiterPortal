USE [UMRRecruitmentApplicant]
GO

CREATE PROCEDURE [dbo].[sp_InsertJob]	
	@Status [bit] NULL,
	@JobTitle [nvarchar](500) NULL,
	@JobDescription [nvarchar](max) NULL,
	@PositionId [int] NULL,
	@InstituteId [int] NULL,
	@AgencyId [bigint],
	@CreatedBy [int] NULL,
	@CreatedDate [datetime] NULL	
AS
BEGIN

INSERT INTO [dbo].[Job]
           ([Status]
           ,[JobTitle]
           ,[JobDescription]
           ,[PositionId]
           ,[InstituteId]
           ,[AgencyId]
           ,[CreatedBy]
           ,[CreatedDate]
           )
     VALUES
           (
				@Status
			   ,@JobTitle
			   ,@JobDescription
			   ,@PositionId
			   ,@InstituteId
			   ,@AgencyId
			   ,@CreatedBy
			   ,@CreatedDate
		   )
END



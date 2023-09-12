USE [UMRRecruitmentApplicant]
GO
CREATE PROCEDURE [dbo].[sp_UpdateAgency]
(
    @AgencyId bigint,
	@AgencyName nvarchar(100),
	@UpdatedBy int,
	@UpdatedDate datetime,
	@AgencyAddress nvarchar(200),
	@AgencyEmail nvarchar(100),
	@AgencyPhone nvarchar(50),
	@AgencyContactPerson nvarchar(50),
	@AgencyContactPersonPhone nvarchar(50),
	@IsActive nvarchar(50),
	@AgencyLoginId nvarchar(50)
)
AS

SET NOCOUNT OFF;

UPDATE [dbo].[Agency]
   SET [AgencyName] = @AgencyName
      ,[UpdatedBy] = @UpdatedBy
      ,[UpdatedDate] = @UpdatedDate
      ,[AgencyAddress] = @AgencyAddress
      ,[AgencyEmail] = @AgencyEmail
      ,[AgencyPhone] = @AgencyPhone
      ,[AgencyContactPerson] = @AgencyContactPerson
      ,[AgencyContactPersonPhone] = @AgencyContactPersonPhone
      ,[IsActive] = @IsActive
      ,[AgencyLoginId] = @AgencyLoginId
 WHERE AgencyId = @AgencyId
GO



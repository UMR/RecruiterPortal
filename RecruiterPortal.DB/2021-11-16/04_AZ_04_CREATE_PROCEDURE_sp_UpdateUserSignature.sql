USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateUserSignature]    Script Date: 11/16/2021 12:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_UpdateUserSignature]
(
	@SignatureName nvarchar(500),	
	@UserID bigint,	
	@UserSignatureID bigint
)

AS
BEGIN
UPDATE [dbo].[UserSignature]
	SET	 [SignatureName] = @SignatureName		
		,[UserID] = @UserID			
WHERE [UserSignatureID] = @UserSignatureID

END

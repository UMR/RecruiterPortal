USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetRecruiterByLoginid]    Script Date: 8/11/2023 12:21:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetRecruiterByLoginid]
(
    @LoginId NVARCHAR(50)
)

AS

SELECT * FROM [dbo].[Recruiter] WHERE LoginId=@LoginId;

USE [UMRRecruitmentApplicant]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetRecruiterByLoginid]    Script Date: 9/8/2023 11:57:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetRecruiterByRecruiterId]
(
    @RecruiterId NVARCHAR(50)
)

AS

SELECT * FROM [dbo].[Recruiter] WHERE RecruiterId=@RecruiterId;

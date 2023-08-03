USE [master]
GO
/****** Object:  Database [UMRRecruitmentApplicant]    Script Date: 11/4/2019 3:23:16 PM ******/
CREATE DATABASE [UMRRecruitmentApplicant]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'UMRRecruitmentApplicant', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\UMRRecruitmentApplicant.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'UMRRecruitmentApplicant_log', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\UMRRecruitmentApplicant_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [UMRRecruitmentApplicant].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET ARITHABORT OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET  DISABLE_BROKER 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET RECOVERY FULL 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET  MULTI_USER 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET DB_CHAINING OFF 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'UMRRecruitmentApplicant', N'ON'
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET QUERY_STORE = OFF
GO
USE [UMRRecruitmentApplicant]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [UMRRecruitmentApplicant]
GO
/****** Object:  Table [dbo].[User]    Script Date: 11/4/2019 3:23:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserID] [bigint] NOT NULL,
	[First_Name] [nvarchar](30) NOT NULL,
	[Last_Name] [nvarchar](30) NOT NULL,
	[Email] [nvarchar](200) NOT NULL,
	[Password] [nvarchar](500) NOT NULL,
	[IsVerified] [bit] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_IsVerified]  DEFAULT ((0)) FOR [IsVerified]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetSParams]    Script Date: 11/4/2019 3:23:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetSParams] 
@p_SpName NVARCHAR(500) = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT
		  PARAMETER_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,PARAMETER_MODE 
	FROM
		  INFORMATION_SCHEMA.PARAMETERS
	WHERE
		  SPECIFIC_NAME=@p_SpName
	END
GO
/****** Object:  StoredProcedure [dbo].[SP_USERVALIDATE]    Script Date: 11/4/2019 3:23:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_USERVALIDATE]  
   @p_Email NVARCHAR(1000), 
   @p_Password NVARCHAR(1000)
AS 
BEGIN      

		Declare @userKey bigint;
		SET @userKey = -666;
		SELECT * FROM [User] WHERE  [User].Email = @p_Email AND [User].[Password] = @p_Password;
END
GO
USE [master]
GO
ALTER DATABASE [UMRRecruitmentApplicant] SET  READ_WRITE 
GO

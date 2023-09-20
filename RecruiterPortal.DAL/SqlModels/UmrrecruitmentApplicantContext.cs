using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RecruiterPortal.DAL.SqlModels;

public partial class UmrrecruitmentApplicantContext : DbContext
{
    public UmrrecruitmentApplicantContext()
    {
    }

    public UmrrecruitmentApplicantContext(DbContextOptions<UmrrecruitmentApplicantContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Agency> Agencies { get; set; }

    public virtual DbSet<AgreementFrom> AgreementFroms { get; set; }

    public virtual DbSet<AppVersion> AppVersions { get; set; }

    public virtual DbSet<ApplicantInfoModel> ApplicantInfoModels { get; set; }

    public virtual DbSet<ApplicantStatus> ApplicantStatuses { get; set; }

    public virtual DbSet<Cbcform> Cbcforms { get; set; }

    public virtual DbSet<ChangeTracker> ChangeTrackers { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<EyeColor> EyeColors { get; set; }

    public virtual DbSet<GeneratedFile> GeneratedFiles { get; set; }

    public virtual DbSet<HairColor> HairColors { get; set; }

    public virtual DbSet<HepaBhippa> HepaBhippas { get; set; }

    public virtual DbSet<InfluenzaVaccination> InfluenzaVaccinations { get; set; }

    public virtual DbSet<Institution> Institutions { get; set; }

    public virtual DbSet<Job> Jobs { get; set; }

    public virtual DbSet<LookupZipCode> LookupZipCodes { get; set; }

    public virtual DbSet<MailTemplateType> MailTemplateTypes { get; set; }

    public virtual DbSet<NurseForm> NurseForms { get; set; }

    public virtual DbSet<Pdftemplate> Pdftemplates { get; set; }

    public virtual DbSet<Position> Positions { get; set; }

    public virtual DbSet<Race> Races { get; set; }

    public virtual DbSet<Recruiter> Recruiters { get; set; }

    public virtual DbSet<RecruiterRole> RecruiterRoles { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<State> States { get; set; }

    public virtual DbSet<TermsCondition> TermsConditions { get; set; }

    public virtual DbSet<Usci> Uscis { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserCompany> UserCompanies { get; set; }

    public virtual DbSet<UserDetail> UserDetails { get; set; }

    public virtual DbSet<UserEducation> UserEducations { get; set; }

    public virtual DbSet<UserEmergencyInfo> UserEmergencyInfos { get; set; }

    public virtual DbSet<UserFile> UserFiles { get; set; }

    public virtual DbSet<UserLicense> UserLicenses { get; set; }

    public virtual DbSet<UserMilitary> UserMilitaries { get; set; }

    public virtual DbSet<UserPhoto> UserPhotos { get; set; }

    public virtual DbSet<UserPhysical> UserPhysicals { get; set; }

    public virtual DbSet<UserRecruiterComment> UserRecruiterComments { get; set; }

    public virtual DbSet<UserReference> UserReferences { get; set; }

    public virtual DbSet<UserSignature> UserSignatures { get; set; }

    public virtual DbSet<UserSocial> UserSocials { get; set; }

    public virtual DbSet<UserVerification> UserVerifications { get; set; }

    public virtual DbSet<ViewAgency> ViewAgencies { get; set; }

    public virtual DbSet<ViewApplicantPortalUsci> ViewApplicantPortalUscis { get; set; }

    public virtual DbSet<ViewCountryName> ViewCountryNames { get; set; }

    public virtual DbSet<ViewEyeColor> ViewEyeColors { get; set; }

    public virtual DbSet<ViewHairColor> ViewHairColors { get; set; }

    public virtual DbSet<ViewImportedApplcant> ViewImportedApplcants { get; set; }

    public virtual DbSet<ViewImportedApplicantMailConfig> ViewImportedApplicantMailConfigs { get; set; }

    public virtual DbSet<ViewIssueAuthority> ViewIssueAuthorities { get; set; }

    public virtual DbSet<ViewIssuingAuthority> ViewIssuingAuthorities { get; set; }

    public virtual DbSet<ViewLookUpZipCode> ViewLookUpZipCodes { get; set; }

    public virtual DbSet<ViewMailConfiguration> ViewMailConfigurations { get; set; }

    public virtual DbSet<ViewNotImported> ViewNotImporteds { get; set; }

    public virtual DbSet<ViewPdftemplate> ViewPdftemplates { get; set; }

    public virtual DbSet<ViewRace> ViewRaces { get; set; }

    public virtual DbSet<ViewState> ViewStates { get; set; }

    public virtual DbSet<W9from> W9froms { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=UMRRecruitmentApplicant; user id=sa;password=123456; Integrated Security=false;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Agency>(entity =>
        {
            entity.ToTable("Agency");

            entity.Property(e => e.AgencyAddress).HasMaxLength(512);
            entity.Property(e => e.AgencyContactPerson).HasMaxLength(256);
            entity.Property(e => e.AgencyContactPersonPhone).HasMaxLength(15);
            entity.Property(e => e.AgencyEmail).HasMaxLength(256);
            entity.Property(e => e.AgencyLoginId).HasMaxLength(256);
            entity.Property(e => e.AgencyName).HasMaxLength(500);
            entity.Property(e => e.AgencyPhone).HasMaxLength(15);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.Urlprefix)
                .HasMaxLength(256)
                .HasColumnName("URLPrefix");
        });

        modelBuilder.Entity<AgreementFrom>(entity =>
        {
            entity.HasKey(e => e.AgreementId).HasName("PK_AGREEMENT");

            entity.ToTable("AgreementFrom", tb => tb.HasTrigger("Update_ChangeTracker"));

            entity.Property(e => e.AgreementId).HasColumnName("AgreementID");
            entity.Property(e => e.City).HasMaxLength(500);
            entity.Property(e => e.ContractorName).HasMaxLength(500);
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Notary).HasMaxLength(500);
            entity.Property(e => e.StateName).HasMaxLength(50);
            entity.Property(e => e.StreetAddress).HasMaxLength(500);
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.ZipCode).HasMaxLength(50);

            entity.HasOne(d => d.User).WithMany(p => p.AgreementFroms)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AGREEMENT_User");
        });

        modelBuilder.Entity<AppVersion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_VersionName");

            entity.ToTable("AppVersion");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.CurrenctVersion).HasMaxLength(30);
            entity.Property(e => e.OldVersion).HasMaxLength(30);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<ApplicantInfoModel>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("ApplicantInfoModel");

            entity.Property(e => e.Apartment).HasMaxLength(50);
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.ConvictionDetail).HasMaxLength(500);
            entity.Property(e => e.CountryFromApplied).HasMaxLength(50);
            entity.Property(e => e.CountryOfBirth).HasMaxLength(50);
            entity.Property(e => e.DateAvailable).HasColumnType("datetime");
            entity.Property(e => e.DateOfBirth).HasColumnType("datetime");
            entity.Property(e => e.DesiredSalary).HasMaxLength(200);
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(200);
            entity.Property(e => e.EyeColor).HasMaxLength(200);
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(30);
            entity.Property(e => e.Gender).HasMaxLength(20);
            entity.Property(e => e.HairColor).HasMaxLength(50);
            entity.Property(e => e.Height).HasMaxLength(10);
            entity.Property(e => e.IsUscitizen).HasColumnName("IsUSCitizen");
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(30);
            entity.Property(e => e.MiddleName).HasMaxLength(200);
            entity.Property(e => e.Phone).HasMaxLength(50);
            entity.Property(e => e.PositionAppliedFor)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Race).HasMaxLength(15);
            entity.Property(e => e.Ssn)
                .HasMaxLength(10)
                .HasColumnName("SSN");
            entity.Property(e => e.State).HasMaxLength(50);
            entity.Property(e => e.StreetAddress).HasMaxLength(500);
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Weight).HasMaxLength(10);
            entity.Property(e => e.ZipCode).HasMaxLength(50);
        });

        modelBuilder.Entity<ApplicantStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ApplicantInstitutionStatus");

            entity.ToTable("ApplicantStatus");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.CurrentSalary).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.ExpectedSalary).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Shift)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Agency).WithMany(p => p.ApplicantStatuses)
                .HasForeignKey(d => d.AgencyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApplicantStatus_Agency");

            entity.HasOne(d => d.Applicant).WithMany(p => p.ApplicantStatuses)
                .HasForeignKey(d => d.ApplicantId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApplicantStatus_User");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ApplicantStatusCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_ApplicantStatus_Recruiter");

            entity.HasOne(d => d.Position).WithMany(p => p.ApplicantStatuses)
                .HasForeignKey(d => d.PositionId)
                .HasConstraintName("FK_ApplicantStatus_Position");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.ApplicantStatusUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("FK_ApplicantStatus_Recruiter1");
        });

        modelBuilder.Entity<Cbcform>(entity =>
        {
            entity.HasKey(e => e.Cbcid).HasName("PK_CBC");

            entity.ToTable("CBCForm", tb => tb.HasTrigger("Update_ChangeTracker_CBCForm"));

            entity.Property(e => e.Cbcid).HasColumnName("CBCID");
            entity.Property(e => e.Aapt)
                .HasMaxLength(500)
                .HasColumnName("AApt");
            entity.Property(e => e.Acity)
                .HasMaxLength(500)
                .HasColumnName("ACity");
            entity.Property(e => e.Adate)
                .HasMaxLength(500)
                .HasColumnName("ADate");
            entity.Property(e => e.Aemail)
                .HasMaxLength(500)
                .HasColumnName("AEmail");
            entity.Property(e => e.AgencyIdentification).HasMaxLength(500);
            entity.Property(e => e.AgencyName).HasMaxLength(500);
            entity.Property(e => e.AliasAka)
                .HasMaxLength(500)
                .HasColumnName("Alias_AKA");
            entity.Property(e => e.ApfirstName)
                .HasMaxLength(500)
                .HasColumnName("APFirstName");
            entity.Property(e => e.AplastName)
                .HasMaxLength(500)
                .HasColumnName("APLastName");
            entity.Property(e => e.Astate)
                .HasMaxLength(500)
                .HasColumnName("AState");
            entity.Property(e => e.AstreetName)
                .HasMaxLength(500)
                .HasColumnName("AStreetName");
            entity.Property(e => e.AstreetNo)
                .HasMaxLength(500)
                .HasColumnName("AStreetNo");
            entity.Property(e => e.AtelephoneNo)
                .HasMaxLength(500)
                .HasColumnName("ATelephoneNo");
            entity.Property(e => e.AzipCode)
                .HasMaxLength(500)
                .HasColumnName("AZipCode");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DateFingerPrinted).HasMaxLength(500);
            entity.Property(e => e.Fcity)
                .HasMaxLength(500)
                .HasColumnName("FCity");
            entity.Property(e => e.FfirstName)
                .HasMaxLength(500)
                .HasColumnName("FFirstName");
            entity.Property(e => e.FidentificationVerified)
                .HasMaxLength(500)
                .HasColumnName("FIdentificationVerified");
            entity.Property(e => e.FingerprintServicesName).HasMaxLength(500);
            entity.Property(e => e.FingerprintingMethod).HasMaxLength(500);
            entity.Property(e => e.FlastName)
                .HasMaxLength(500)
                .HasColumnName("FLastName");
            entity.Property(e => e.FstAddress)
                .HasMaxLength(500)
                .HasColumnName("FStAddress");
            entity.Property(e => e.Fstate)
                .HasMaxLength(500)
                .HasColumnName("FState");
            entity.Property(e => e.Ftitle)
                .HasMaxLength(500)
                .HasColumnName("FTitle");
            entity.Property(e => e.Fzip)
                .HasMaxLength(500)
                .HasColumnName("FZip");
            entity.Property(e => e.HomePhone).HasMaxLength(500);
            entity.Property(e => e.LhcsaLicense)
                .HasMaxLength(500)
                .HasColumnName("LHCSA_License");
            entity.Property(e => e.LthhpPfi)
                .HasMaxLength(500)
                .HasColumnName("LTHHP_PFI");
            entity.Property(e => e.MotherMaidenName).HasMaxLength(500);
            entity.Property(e => e.ParentorLegalGuardian).HasMaxLength(500);
            entity.Property(e => e.Signature).HasMaxLength(500);
            entity.Property(e => e.Title).HasMaxLength(500);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Cbcforms)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CBC_User");
        });

        modelBuilder.Entity<ChangeTracker>(entity =>
        {
            entity.ToTable("ChangeTracker");

            entity.Property(e => e.ChangeTrackerId).HasColumnName("ChangeTrackerID");
            entity.Property(e => e.ChangeDate).HasColumnType("datetime");
            entity.Property(e => e.ImportDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.ChangeTrackers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChangeTracker_User1");
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.ToTable("Country");

            entity.Property(e => e.CountryName)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<EyeColor>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EyeColor");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EyeColor1)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("EyeColor");
            entity.Property(e => e.EyeColorCode)
                .IsRequired()
                .HasMaxLength(4);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<GeneratedFile>(entity =>
        {
            entity.Property(e => e.GeneratedFileId).HasColumnName("GeneratedFileID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FileName)
                .HasMaxLength(150)
                .HasColumnName("FIleName");
            entity.Property(e => e.FileTypeCode).HasMaxLength(50);
            entity.Property(e => e.TermplateId).HasColumnName("TermplateID");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.GeneratedFiles)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GeneratedFiles_GeneratedFiles");
        });

        modelBuilder.Entity<HairColor>(entity =>
        {
            entity.HasKey(e => e.HairColorCode);

            entity.ToTable("HairColor");

            entity.Property(e => e.HairColorCode).HasMaxLength(4);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.HairColor1)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("HairColor");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<HepaBhippa>(entity =>
        {
            entity.ToTable("HepaBHIPPA", tb => tb.HasTrigger("Update_ChangeTracker_HepaBHIPPA"));

            entity.Property(e => e.HepaBhippaid).HasColumnName("HepaBHIPPAID");
            entity.Property(e => e.Comment).HasMaxLength(500);
            entity.Property(e => e.ComplianceOfficer).HasMaxLength(100);
            entity.Property(e => e.SignatureDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.WitnessName).HasMaxLength(100);
            entity.Property(e => e.WitnessSignatureDate).HasColumnType("datetime");

            entity.HasOne(d => d.User).WithMany(p => p.HepaBhippas)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HepaBHIPPA_User1");
        });

        modelBuilder.Entity<InfluenzaVaccination>(entity =>
        {
            entity.ToTable("InfluenzaVaccination", tb => tb.HasTrigger("Update_ChangeTracker_InfluenzaVaccination"));

            entity.Property(e => e.InfluenzaVaccinationId).HasColumnName("InfluenzaVaccinationID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Department).HasMaxLength(500);
            entity.Property(e => e.EntryDate).HasColumnType("datetime");
            entity.Property(e => e.FacilityName).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(500);
            entity.Property(e => e.ReasonDeclination).HasMaxLength(500);
            entity.Property(e => e.Signature).HasMaxLength(500);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.InfluenzaVaccinations)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InfluenzaVaccination_UserID");
        });

        modelBuilder.Entity<Institution>(entity =>
        {
            entity.ToTable("Institution");

            entity.Property(e => e.Address).HasMaxLength(200);
            entity.Property(e => e.County).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.InstituteName)
                .IsRequired()
                .HasMaxLength(250);
            entity.Property(e => e.Telephone).HasMaxLength(50);
            entity.Property(e => e.Town).HasMaxLength(50);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.Website).HasMaxLength(200);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<Job>(entity =>
        {
            entity.ToTable("Job");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.JobTitle).HasMaxLength(500);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Agency).WithMany(p => p.Jobs)
                .HasForeignKey(d => d.AgencyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Job_Agency");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.JobCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_Job_Recruiter");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.JobUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("FK_Job_Recruiter1");
        });

        modelBuilder.Entity<LookupZipCode>(entity =>
        {
            entity.ToTable("Lookup_ZipCode");

            entity.Property(e => e.AcceptableCities)
                .HasMaxLength(255)
                .HasColumnName("acceptable_cities");
            entity.Property(e => e.AreaCodes).HasColumnName("area_codes");
            entity.Property(e => e.City)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Country)
                .HasMaxLength(255)
                .HasColumnName("country");
            entity.Property(e => e.County)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Decommissioned).HasColumnName("decommissioned");
            entity.Property(e => e.EstimatedPopulation).HasColumnName("estimated_population");
            entity.Property(e => e.Latitude).HasColumnName("latitude");
            entity.Property(e => e.Longitude).HasColumnName("longitude");
            entity.Property(e => e.Notes)
                .HasMaxLength(255)
                .HasColumnName("notes");
            entity.Property(e => e.StateAbbr)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Timezone)
                .HasMaxLength(255)
                .HasColumnName("timezone");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasColumnName("type");
            entity.Property(e => e.UnacceptableCities)
                .HasMaxLength(255)
                .HasColumnName("unacceptable_cities");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.WorldRegion)
                .HasMaxLength(255)
                .HasColumnName("world_region");
            entity.Property(e => e.ZipCode)
                .IsRequired()
                .HasMaxLength(50);
        });

        modelBuilder.Entity<MailTemplateType>(entity =>
        {
            entity.ToTable("MailTemplateType");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.MailTemplateTypeCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_MailTemplateType_Recruiter");

            entity.HasOne(d => d.Recruiter).WithMany(p => p.MailTemplateTypeRecruiters)
                .HasForeignKey(d => d.RecruiterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MailTemplateType_Recruiter2");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.MailTemplateTypeUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("FK_MailTemplateType_Recruiter1");
        });

        modelBuilder.Entity<NurseForm>(entity =>
        {
            entity.ToTable("NurseForm", tb => tb.HasTrigger("Update_ChangeTracker_NurseForm"));

            entity.Property(e => e.NurseFormId).HasColumnName("NurseFormID");
            entity.Property(e => e.CgfnscertificateNumber)
                .HasMaxLength(500)
                .HasColumnName("CGFNSCertificateNumber");
            entity.Property(e => e.Cgfnscnatscompleted)
                .HasMaxLength(500)
                .HasColumnName("CGFNSCNATSCompleted");
            entity.Property(e => e.CgfnsexaminationDate)
                .HasColumnType("datetime")
                .HasColumnName("CGFNSExaminationDate");
            entity.Property(e => e.CnatsexamScore)
                .HasMaxLength(500)
                .HasColumnName("CNATSExamScore");
            entity.Property(e => e.CnatsexaminationDate)
                .HasColumnType("datetime")
                .HasColumnName("CNATSExaminationDate");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EmployerCity).HasMaxLength(500);
            entity.Property(e => e.EmployerCountry).HasMaxLength(500);
            entity.Property(e => e.EmployerEmail).HasMaxLength(500);
            entity.Property(e => e.EmployerFax).HasMaxLength(500);
            entity.Property(e => e.EmployerName).HasMaxLength(500);
            entity.Property(e => e.EmployerStateProvince).HasMaxLength(500);
            entity.Property(e => e.EmployerStreetAddress).HasMaxLength(500);
            entity.Property(e => e.EmployerTelephone).HasMaxLength(500);
            entity.Property(e => e.EmployerZipCode).HasMaxLength(500);
            entity.Property(e => e.FailedPnlicensing).HasColumnName("FailedPNLicensing");
            entity.Property(e => e.FailedRnlicensing).HasColumnName("FailedRNLicensing");
            entity.Property(e => e.NewYorkStateLicenseNumber1).HasMaxLength(500);
            entity.Property(e => e.NewYorkStateLicenseNumber2).HasMaxLength(500);
            entity.Property(e => e.NewYorkStateProfession).HasMaxLength(500);
            entity.Property(e => e.NewYorkStateProfessionalLicenseNumber).HasMaxLength(500);
            entity.Property(e => e.NursingSchoolAddress).HasMaxLength(500);
            entity.Property(e => e.NursingSchoolAttended).HasMaxLength(500);
            entity.Property(e => e.NursingSchoolCompletedDate).HasColumnType("datetime");
            entity.Property(e => e.PermitteesName).HasMaxLength(500);
            entity.Property(e => e.PracticeCity).HasMaxLength(500);
            entity.Property(e => e.PracticeCountry).HasMaxLength(500);
            entity.Property(e => e.PracticeEmail).HasMaxLength(500);
            entity.Property(e => e.PracticeFax).HasMaxLength(500);
            entity.Property(e => e.PracticeName).HasMaxLength(500);
            entity.Property(e => e.PracticeStateProvince).HasMaxLength(500);
            entity.Property(e => e.PracticeStreetAddress).HasMaxLength(500);
            entity.Property(e => e.PracticeTelephone).HasMaxLength(500);
            entity.Property(e => e.PracticeZipCode).HasMaxLength(500);
            entity.Property(e => e.PrintName).HasMaxLength(500);
            entity.Property(e => e.RegisteredProfessionalNurse).HasMaxLength(500);
            entity.Property(e => e.Rnlpnemployed)
                .HasMaxLength(500)
                .HasColumnName("RNLPNEmployed");
            entity.Property(e => e.SignatureBehalfEmployer).HasMaxLength(500);
            entity.Property(e => e.SignatureDate).HasColumnType("datetime");
            entity.Property(e => e.Title).HasMaxLength(500);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.NurseForms)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NurseForm_UserID");
        });

        modelBuilder.Entity<Pdftemplate>(entity =>
        {
            entity.HasKey(e => e.TermplateId);

            entity.ToTable("PDFTemplates");

            entity.Property(e => e.TermplateId).HasColumnName("TermplateID");
            entity.Property(e => e.FileName)
                .HasMaxLength(150)
                .HasColumnName("FIleName");
            entity.Property(e => e.FileTypeCode).HasMaxLength(50);
        });

        modelBuilder.Entity<Position>(entity =>
        {
            entity.ToTable("Position");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.PositionName)
                .IsRequired()
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Race>(entity =>
        {
            entity.HasKey(e => e.Race1).HasName("PK_L_RC");

            entity.ToTable("Race");

            entity.Property(e => e.Race1)
                .HasMaxLength(200)
                .HasColumnName("Race");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.RaceCode)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Recruiter>(entity =>
        {
            entity.ToTable("Recruiter");

            entity.Property(e => e.RecruiterId).HasColumnName("RecruiterID");
            entity.Property(e => e.AgencyId).HasColumnName("AgencyID");
            entity.Property(e => e.ApplicantTypeId).HasColumnName("ApplicantTypeID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.LoginId)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Odapermission).HasColumnName("ODAPermission");
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Telephone)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TimeOut).HasDefaultValueSql("((144000))");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Agency).WithMany(p => p.Recruiters).HasForeignKey(d => d.AgencyId);
        });

        modelBuilder.Entity<RecruiterRole>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.RecruiterId).HasColumnName("RecruiterID");
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.RoleKey)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.RoleName)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<State>(entity =>
        {
            entity.ToTable("State");

            entity.Property(e => e.StateId).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.StateCode)
                .IsRequired()
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.StateName)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Country).WithMany(p => p.States)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_State_Country");
        });

        modelBuilder.Entity<TermsCondition>(entity =>
        {
            entity.HasKey(e => e.TermsConditionsId);

            entity.ToTable(tb => tb.HasTrigger("Update_ChangeTracker_TermsConditions"));

            entity.Property(e => e.TermsConditionsId).HasColumnName("TermsConditionsID");
            entity.Property(e => e.AuthorizedBy).HasMaxLength(500);
            entity.Property(e => e.AuthorizedDate).HasColumnType("datetime");
            entity.Property(e => e.City).HasMaxLength(500);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EffectiveDate).HasColumnType("datetime");
            entity.Property(e => e.FacilityName).HasMaxLength(500);
            entity.Property(e => e.GeneralLiabilityInsurancePolicyNo).HasMaxLength(500);
            entity.Property(e => e.MalpracticeInsurancePolicyNo).HasMaxLength(500);
            entity.Property(e => e.NameDisabilityInsurance).HasMaxLength(500);
            entity.Property(e => e.NameDisabilityInsurancePolicyNo).HasMaxLength(500);
            entity.Property(e => e.NameGeneralLiabilityInsurance).HasMaxLength(500);
            entity.Property(e => e.NameMalpracticeInsurance).HasMaxLength(500);
            entity.Property(e => e.NameWorkersCompensationInsurance).HasMaxLength(500);
            entity.Property(e => e.OfficePhone).HasMaxLength(500);
            entity.Property(e => e.Position).HasMaxLength(500);
            entity.Property(e => e.RatePayCompensation).HasMaxLength(500);
            entity.Property(e => e.SignatureDate).HasColumnType("datetime");
            entity.Property(e => e.StateName).HasMaxLength(500);
            entity.Property(e => e.StreetAddress).HasMaxLength(500);
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.WorkersCompensationInsurancePolicyNo).HasMaxLength(500);
            entity.Property(e => e.ZipCode).HasMaxLength(500);

            entity.HasOne(d => d.User).WithMany(p => p.TermsConditions)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TermsConditions_UserID");
        });

        modelBuilder.Entity<Usci>(entity =>
        {
            entity.HasKey(e => e.Uscisid);

            entity.ToTable("USCIS", tb => tb.HasTrigger("Update_ChangeTracker_USCIS"));

            entity.Property(e => e.Uscisid).HasColumnName("USCISID");
            entity.Property(e => e.AdditionalInformation).HasMaxLength(1000);
            entity.Property(e => e.Apt).HasMaxLength(50);
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.DocumentNumber).HasMaxLength(500);
            entity.Property(e => e.DocumentTitle).HasMaxLength(500);
            entity.Property(e => e.EmploymentDate).HasColumnType("datetime");
            entity.Property(e => e.ExpirationDate).HasColumnType("datetime");
            entity.Property(e => e.ForeignPassort).HasMaxLength(500);
            entity.Property(e => e.I94admissionNumber)
                .HasMaxLength(500)
                .HasColumnName("I94AdmissionNumber");
            entity.Property(e => e.StateName).HasMaxLength(50);
            entity.Property(e => e.StreetAddress).HasMaxLength(500);
            entity.Property(e => e.TranslatorFirstName).HasMaxLength(500);
            entity.Property(e => e.TranslatorLastName).HasMaxLength(500);
            entity.Property(e => e.Uscisnumber)
                .HasMaxLength(500)
                .HasColumnName("USCISNumber");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.WorkAuthExpiryDate).HasColumnType("datetime");
            entity.Property(e => e.ZipCode).HasMaxLength(50);

            entity.HasOne(d => d.User).WithMany(p => p.Uscis)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_USCIS_User");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User", tb => tb.HasTrigger("Update_ChangeTracker_User"));

            entity.HasIndex(e => e.Email, "UQ_UserEmail").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(200);
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(30)
                .HasColumnName("First_Name");
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(30)
                .HasColumnName("Last_Name");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(200)
                .HasColumnName("Middle_Name");
            entity.Property(e => e.Password).HasMaxLength(500);
        });

        modelBuilder.Entity<UserCompany>(entity =>
        {
            entity.HasKey(e => e.UserCompanyId).HasName("PK_UseCompany");

            entity.ToTable("UserCompany", tb => tb.HasTrigger("Update_ChangeTracker_UserCompany"));

            entity.Property(e => e.UserCompanyId).HasColumnName("UserCompanyID");
            entity.Property(e => e.CompanyAddress).HasMaxLength(500);
            entity.Property(e => e.CompanyName)
                .IsRequired()
                .HasMaxLength(500);
            entity.Property(e => e.CompanyPhone)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.EminstituteId).HasColumnName("EMInstituteID");
            entity.Property(e => e.EmpositionId).HasColumnName("EMPositionID");
            entity.Property(e => e.EndingSalary).HasMaxLength(200);
            entity.Property(e => e.FromDate).HasColumnType("datetime");
            entity.Property(e => e.JobTitle)
                .IsRequired()
                .HasMaxLength(500)
                .HasColumnName("JobTItle");
            entity.Property(e => e.LeaveReason).HasMaxLength(500);
            entity.Property(e => e.Responisiblities)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.StartingSalary).HasMaxLength(200);
            entity.Property(e => e.Supervisor).HasMaxLength(250);
            entity.Property(e => e.ToDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.UserCompanies)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UseCompany_User");
        });

        modelBuilder.Entity<UserDetail>(entity =>
        {
            entity.HasKey(e => e.UserDetailsId);

            entity.ToTable(tb => tb.HasTrigger("Update_ChangeTracker_UserDetails"));

            entity.Property(e => e.UserDetailsId).HasColumnName("UserDetailsID");
            entity.Property(e => e.Apt).HasMaxLength(50);
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.ConvictionDetail).HasMaxLength(500);
            entity.Property(e => e.CountryFromApplied).HasMaxLength(50);
            entity.Property(e => e.CountryOfBirth).HasMaxLength(50);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DateAvailable).HasColumnType("datetime");
            entity.Property(e => e.DateOfBirth).HasColumnType("datetime");
            entity.Property(e => e.DesiredPosition)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.DesiredSalary).HasMaxLength(200);
            entity.Property(e => e.Gender).HasMaxLength(20);
            entity.Property(e => e.IsUscitizen).HasColumnName("IsUSCitizen");
            entity.Property(e => e.Phone)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Ssn)
                .HasMaxLength(10)
                .HasColumnName("SSN");
            entity.Property(e => e.StateName).HasMaxLength(50);
            entity.Property(e => e.StreetAddress).HasMaxLength(500);
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.ZipCode).HasMaxLength(50);

            entity.HasOne(d => d.User).WithMany(p => p.UserDetails)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserDetails_User");
        });

        modelBuilder.Entity<UserEducation>(entity =>
        {
            entity.ToTable("UserEducation", tb => tb.HasTrigger("Update_ChangeTracker_UserEducation"));

            entity.Property(e => e.UserEducationId).HasColumnName("UserEducationID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Degree)
                .IsRequired()
                .HasMaxLength(200);
            entity.Property(e => e.SchoolAddress).HasMaxLength(500);
            entity.Property(e => e.SchoolName)
                .IsRequired()
                .HasMaxLength(500);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.UserEducations)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserEducation_User");
        });

        modelBuilder.Entity<UserEmergencyInfo>(entity =>
        {
            entity.ToTable("UserEmergencyInfo", tb => tb.HasTrigger("Update_ChangeTracker_UserEmergencyInfo"));

            entity.Property(e => e.UserEmergencyInfoId).HasColumnName("UserEmergencyInfoID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.EmrCellPhone).HasMaxLength(50);
            entity.Property(e => e.EmrFirstName)
                .IsRequired()
                .HasMaxLength(30);
            entity.Property(e => e.EmrHomePhone)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.EmrLastName)
                .IsRequired()
                .HasMaxLength(30);
            entity.Property(e => e.EmrWorkPhone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NatureOfRelationship).HasMaxLength(50);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.UserEmergencyInfos)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserEmergencyInfo_User");
        });

        modelBuilder.Entity<UserFile>(entity =>
        {
            entity.HasKey(e => e.UserFileId).HasName("PK_UserFiles");

            entity.ToTable("UserFile", tb => tb.HasTrigger("Update_ChangeTracker_UserFile"));

            entity.Property(e => e.UserFileId).HasColumnName("UserFileID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FileData)
                .IsRequired()
                .HasColumnName("FIleData");
            entity.Property(e => e.FileName).IsRequired();
            entity.Property(e => e.FileType).HasDefaultValueSql("((3))");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.UserFiles)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserFiles_User");
        });

        modelBuilder.Entity<UserLicense>(entity =>
        {
            entity.HasKey(e => e.LicenseId).HasName("PK_License");

            entity.ToTable("UserLicense");

            entity.Property(e => e.LicenseId).HasColumnName("LicenseID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ExpiryDate).HasColumnType("datetime");
            entity.Property(e => e.FileData).HasColumnName("FIleData");
            entity.Property(e => e.FileName).HasMaxLength(512);
            entity.Property(e => e.IssueAuthority)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IssuedDate).HasColumnType("datetime");
            entity.Property(e => e.LicenseNameA).HasMaxLength(200);
            entity.Property(e => e.LicenseNameB).HasMaxLength(200);
            entity.Property(e => e.LicenseNameC).HasMaxLength(200);
            entity.Property(e => e.LicenseNo).HasMaxLength(50);
            entity.Property(e => e.StateCode)
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.UserLicenses)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserLicense_User");
        });

        modelBuilder.Entity<UserMilitary>(entity =>
        {
            entity.ToTable("UserMilitary");

            entity.Property(e => e.UserMilitaryId).HasColumnName("UserMilitaryID");
            entity.Property(e => e.Branch).HasMaxLength(500);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DisonourComment).HasMaxLength(500);
            entity.Property(e => e.FromDate).HasColumnType("datetime");
            entity.Property(e => e.RankAtDischarge).HasMaxLength(150);
            entity.Property(e => e.ToDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.UserMilitaries)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserMilitary_User");
        });

        modelBuilder.Entity<UserPhoto>(entity =>
        {
            entity.HasKey(e => e.PhotoId);

            entity.ToTable("UserPhoto", tb => tb.HasTrigger("Update_ChangeTracker_UserPhoto"));

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.UserPhotos)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserPhoto_User");
        });

        modelBuilder.Entity<UserPhysical>(entity =>
        {
            entity.ToTable("UserPhysical", tb => tb.HasTrigger("Update_ChangeTracker_UserPhysical"));

            entity.Property(e => e.UserPhysicalId).HasColumnName("UserPhysicalID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.EyeColor).HasMaxLength(200);
            entity.Property(e => e.HairColor).HasMaxLength(200);
            entity.Property(e => e.Height).HasMaxLength(200);
            entity.Property(e => e.Race).HasMaxLength(200);
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Weight).HasMaxLength(200);

            entity.HasOne(d => d.User).WithMany(p => p.UserPhysicals)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserPhysical_User");
        });

        modelBuilder.Entity<UserRecruiterComment>(entity =>
        {
            entity.ToTable("UserRecruiterComment", tb => tb.HasTrigger("Update_ChangeTracker_UserRecruiterComment"));

            entity.Property(e => e.UserRecruiterCommentId).HasColumnName("UserRecruiterCommentID");
            entity.Property(e => e.Comment).IsRequired();
            entity.Property(e => e.CommentDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.RecruiterName).IsRequired();
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.UserRecruiterComments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserRecruiterComment_User");
        });

        modelBuilder.Entity<UserReference>(entity =>
        {
            entity.ToTable("UserReference", tb => tb.HasTrigger("Update_ChangeTracker_UserReference"));

            entity.Property(e => e.UserReferenceId).HasColumnName("UserReferenceID");
            entity.Property(e => e.CompanyName).HasMaxLength(200);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.EminstituteId).HasColumnName("EMInstituteID");
            entity.Property(e => e.NatureOfRelationship).HasMaxLength(50);
            entity.Property(e => e.RefAddress).HasMaxLength(500);
            entity.Property(e => e.RefEmail).HasMaxLength(100);
            entity.Property(e => e.RefFirstName)
                .IsRequired()
                .HasMaxLength(30);
            entity.Property(e => e.RefLastName).HasMaxLength(30);
            entity.Property(e => e.RefMiddleName).HasMaxLength(30);
            entity.Property(e => e.RefPhone).HasMaxLength(50);
            entity.Property(e => e.ReferenceType).HasMaxLength(100);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.UserReferences)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserReference_User");
        });

        modelBuilder.Entity<UserSignature>(entity =>
        {
            entity.ToTable("UserSignature", tb => tb.HasTrigger("Update_ChangeTracker_UserSignature"));

            entity.Property(e => e.UserSignatureId).HasColumnName("UserSignatureID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.SignatureName)
                .IsRequired()
                .HasMaxLength(500);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.UserSignatures)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserSignature_User");
        });

        modelBuilder.Entity<UserSocial>(entity =>
        {
            entity.HasKey(e => e.SocialId);

            entity.ToTable("UserSocial", tb => tb.HasTrigger("Update_ChangeTracker_UserSocial"));

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FaceBook).HasMaxLength(1000);
            entity.Property(e => e.Linkedin).HasMaxLength(1000);
            entity.Property(e => e.Twitter).HasMaxLength(1000);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.UserSocials)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserSocial_User");
        });

        modelBuilder.Entity<UserVerification>(entity =>
        {
            entity.ToTable("UserVerification");

            entity.Property(e => e.UserVerificationId).HasColumnName("UserVerificationID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ExpiryDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.VerficationCode).HasMaxLength(10);

            entity.HasOne(d => d.User).WithMany(p => p.UserVerifications)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserVerification_User");
        });

        modelBuilder.Entity<ViewAgency>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_Agency");

            entity.Property(e => e.AgencyAddress).HasMaxLength(512);
            entity.Property(e => e.AgencyContactPerson).HasMaxLength(256);
            entity.Property(e => e.AgencyContactPersonPhone).HasMaxLength(15);
            entity.Property(e => e.AgencyEmail).HasMaxLength(256);
            entity.Property(e => e.AgencyId)
                .ValueGeneratedOnAdd()
                .HasColumnName("AgencyID");
            entity.Property(e => e.AgencyLoginId).HasMaxLength(256);
            entity.Property(e => e.AgencyName).HasMaxLength(500);
            entity.Property(e => e.AgencyPhone).HasMaxLength(15);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.Urlprefix)
                .HasMaxLength(256)
                .HasColumnName("URLPrefix");
        });

        modelBuilder.Entity<ViewApplicantPortalUsci>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_ApplicantPortalUSCIS");

            entity.Property(e => e.AdditionalInformation).HasMaxLength(1000);
            entity.Property(e => e.Apt).HasMaxLength(50);
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.DocumentNumber).HasMaxLength(500);
            entity.Property(e => e.DocumentTitle).HasMaxLength(500);
            entity.Property(e => e.EmploymentDate).HasColumnType("datetime");
            entity.Property(e => e.ExpirationDate).HasColumnType("datetime");
            entity.Property(e => e.ForeignPassort).HasMaxLength(500);
            entity.Property(e => e.I94admissionNumber)
                .HasColumnType("datetime")
                .HasColumnName("I94AdmissionNumber");
            entity.Property(e => e.StateName).HasMaxLength(50);
            entity.Property(e => e.StreetAddress).HasMaxLength(500);
            entity.Property(e => e.TranslatorFirstName).HasMaxLength(500);
            entity.Property(e => e.TranslatorLastName).HasMaxLength(500);
            entity.Property(e => e.Uscisid)
                .ValueGeneratedOnAdd()
                .HasColumnName("USCISID");
            entity.Property(e => e.Uscisnumber)
                .HasMaxLength(500)
                .HasColumnName("USCISNumber");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.WorkAuthExpiryDate).HasColumnType("datetime");
            entity.Property(e => e.ZipCode).HasMaxLength(50);
        });

        modelBuilder.Entity<ViewCountryName>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_Country_name");

            entity.Property(e => e.CountryName)
                .IsRequired()
                .HasMaxLength(50);
        });

        modelBuilder.Entity<ViewEyeColor>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_Eye_Color");

            entity.Property(e => e.EyeColor)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.EyeColorCode)
                .IsRequired()
                .HasMaxLength(4);
        });

        modelBuilder.Entity<ViewHairColor>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_Hair_Color");

            entity.Property(e => e.HairColor)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.HairColorCode)
                .IsRequired()
                .HasMaxLength(4);
        });

        modelBuilder.Entity<ViewImportedApplcant>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_ImportedApplcants");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.FirstName)
                .HasMaxLength(30)
                .HasColumnName("First_Name");
            entity.Property(e => e.ImporterName).HasMaxLength(101);
            entity.Property(e => e.LastName)
                .HasMaxLength(30)
                .HasColumnName("Last_Name");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(200)
                .HasColumnName("Middle_Name");
            entity.Property(e => e.Password).HasMaxLength(500);
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        modelBuilder.Entity<ViewImportedApplicantMailConfig>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_ImportedApplicantMailConfigs");

            entity.Property(e => e.ApplicantPortalUserId).HasColumnName("ApplicantPortalUserID");
            entity.Property(e => e.Pop3userName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("POP3UserName");
        });

        modelBuilder.Entity<ViewIssueAuthority>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_IssueAuthority");

            entity.Property(e => e.IssueAuthority)
                .IsRequired()
                .HasMaxLength(50);
        });

        modelBuilder.Entity<ViewIssuingAuthority>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("ViewIssuingAuthority");

            entity.Property(e => e.IssueAuthority)
                .IsRequired()
                .HasMaxLength(50);
        });

        modelBuilder.Entity<ViewLookUpZipCode>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_LookUp_ZipCode");

            entity.Property(e => e.City)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.County)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Decommissioned).HasColumnName("decommissioned");
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.StateAbbr)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.StateCode)
                .IsRequired()
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.StateName)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.ZipCode)
                .IsRequired()
                .HasMaxLength(50);
        });

        modelBuilder.Entity<ViewMailConfiguration>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_MailConfiguration");

            entity.Property(e => e.ConfigurationId).ValueGeneratedOnAdd();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.GoogleDriveFolderId).HasMaxLength(128);
            entity.Property(e => e.GoogleRefreshToken)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Pop3enableSsl).HasColumnName("POP3EnableSSL");
            entity.Property(e => e.Pop3password)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("POP3Password");
            entity.Property(e => e.Pop3port).HasColumnName("POP3Port");
            entity.Property(e => e.Pop3server)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("POP3Server");
            entity.Property(e => e.Pop3userName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("POP3UserName");
            entity.Property(e => e.ProfileName)
                .IsRequired()
                .HasMaxLength(200);
            entity.Property(e => e.Smtppassword)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("SMTPPassword");
            entity.Property(e => e.Smtpport).HasColumnName("SMTPPort");
            entity.Property(e => e.Smtpserver)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("SMTPServer");
            entity.Property(e => e.SmtpuserName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("SMTPUserName");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<ViewNotImported>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_NotImported");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(200);
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(30)
                .HasColumnName("First_Name");
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(30)
                .HasColumnName("Last_Name");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(200)
                .HasColumnName("Middle_Name");
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(500);
            entity.Property(e => e.UserId)
                .ValueGeneratedOnAdd()
                .HasColumnName("UserID");
        });

        modelBuilder.Entity<ViewPdftemplate>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_PDFTemplates");

            entity.Property(e => e.FileName)
                .HasMaxLength(150)
                .HasColumnName("FIleName");
            entity.Property(e => e.FileTypeCode).HasMaxLength(50);
            entity.Property(e => e.TermplateId)
                .ValueGeneratedOnAdd()
                .HasColumnName("TermplateID");
        });

        modelBuilder.Entity<ViewRace>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_Race");

            entity.Property(e => e.Race)
                .IsRequired()
                .HasMaxLength(15);
        });

        modelBuilder.Entity<ViewState>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_State");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.SateCode)
                .IsRequired()
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.StateName)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<W9from>(entity =>
        {
            entity.HasKey(e => e.Wid).HasName("PK_W9FORM");

            entity.ToTable("W9From", tb => tb.HasTrigger("Update_ChangeTracker_W9From"));

            entity.Property(e => e.Wid).HasColumnName("WID");
            entity.Property(e => e.AccountNumber).HasMaxLength(500);
            entity.Property(e => e.AptNo).HasMaxLength(100);
            entity.Property(e => e.BusinessName).HasMaxLength(500);
            entity.Property(e => e.Ccorporation).HasColumnName("CCorporation");
            entity.Property(e => e.City).HasMaxLength(500);
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.EmployerIdNo).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(500);
            entity.Property(e => e.PayeeCode).HasMaxLength(500);
            entity.Property(e => e.ReportingCode).HasMaxLength(500);
            entity.Property(e => e.RequesterNameAddress).HasMaxLength(500);
            entity.Property(e => e.Scorporation).HasColumnName("SCorporation");
            entity.Property(e => e.Ssn)
                .HasMaxLength(500)
                .HasColumnName("SSN");
            entity.Property(e => e.StateName).HasMaxLength(50);
            entity.Property(e => e.StreetAddress).HasMaxLength(500);
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.ZipCode).HasMaxLength(50);

            entity.HasOne(d => d.User).WithMany(p => p.W9froms)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_W9FORM_User");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

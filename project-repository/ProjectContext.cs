using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using project.domain;
using project.domain.Identity;

namespace project.repository
{
    public class ProjectContext : IdentityDbContext<User,Role,int,IdentityUserClaim<int>,
                                                    UserRole,IdentityUserLogin<int>,IdentityRoleClaim<int>,
                                                    IdentityUserToken<int>>
    {
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options) { }
        public DbSet<Event> Events { get; set; }
        public DbSet<Speaker> Speakers { get; set; }
        public DbSet<SpeakerEvent> SpeakerEvents { get; set; }
        public DbSet<Lot> Lots { get; set; }
        public DbSet<SocialNetwork> SocialNetworks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>
                {
                    userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                    userRole.HasOne(r => r.Role)
                        .WithMany(ur => ur.UserRoles)
                        .HasForeignKey(rid => rid.RoleId)
                        .IsRequired();

                    userRole.HasOne(u => u.User)
                        .WithMany(ur => ur.UserRoles)
                        .HasForeignKey(uid => uid.UserId)
                        .IsRequired();               

                }
            );

            modelBuilder.Entity<SpeakerEvent>()
                .HasKey(PE => new { PE.EventId, PE.SpeakerId });
        }
    }
}
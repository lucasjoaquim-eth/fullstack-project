using System.Security.AccessControl;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace project.domain.Identity
{
    public class User: IdentityUser<int>
    {
        [Column(TypeName = "nvarchar(150)")]
        public string Fullname { get; set; }
        public List<UserRole> UserRoles { get; set; }    
    }
}
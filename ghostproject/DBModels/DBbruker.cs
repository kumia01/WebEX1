using Microsoft.EntityFrameworkCore;

namespace ghostproject.DBModels
{
    public class DBbruker : DbContext
    {
        public DBbruker(DbContextOption<KundeContext> option) : base(option)
        {

        }
    }
}

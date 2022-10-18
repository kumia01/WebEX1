using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ghostproject.Models
{
    public class Brukere
    {
        public int Id { get; set; }
        //public int Personnr { get; set; }
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string Adresse { get; set; }
        virtual public Poststeder Poststed { get; set; }
        virtual public List<Transaksjoner> Transaksjoner { get; set; }
    }

    public class Poststeder
    {
        [Key]
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Postnr { get; set; }
        public string Poststed { get; set; }
        virtual public List<Brukere> Brukere { get; set; }
    }

    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options)
        {
            Database.EnsureCreated();
        }

        virtual public DbSet<Brukere> Brukere { get; set; }
        virtual public DbSet<Aksje> Aksje { get; set; }
        virtual public DbSet<Poststeder> Poststeder { get; set; }
        virtual public DbSet<Transaksjoner> Transaksjoner { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // må importere pakken Microsoft.EntityFrameworkCore.Proxies
            // og legge til"viritual" på de attriuttene som ønskes å lastes automatisk (LazyLoading)
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}

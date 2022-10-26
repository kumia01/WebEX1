using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ghostproject.Models
{

    //Oppretter tabellen brukere, med forhold til Poststeder og Transaksjoner
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

    //Oppretter tabellen poststeder, med forhold til Brukere
    public class Poststeder
    {
        [Key]
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Postnr { get; set; }
        public string Poststed { get; set; }
        virtual public List<Brukere> Brukere { get; set; }
    }

    //Oppretter tabellen FlereAksjer, med forhold til Transaksjoner
    public class FlereAksjer
    {
        public int Id { get; set; }
        public string Ticker { get; set; }
        public string Selskap { get; set; }
        public int Pris { get; set; }
        public int gammelPris { get; set; }
        virtual public List<Transaksjoner> Transaksjoner { get; set; }

    }

    //Oppretter tabellen transaksjoner, med forhold til Brukere og FlereAksjer
    public class Transaksjoner
    {
        public int Id { get; set; }
        public int Volum { get; set; }
        public int Pris { get; set; }
        public int BrukereId { get; set; }
        public int FlereAksjerId { get; set; }
        virtual public Brukere Brukere { get; set; }
        virtual public FlereAksjer FlereAksjer { get; set; }
    }

    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options)
        {
            Database.EnsureCreated();
        }

        virtual public DbSet<Brukere> Brukere { get; set; }
        virtual public DbSet<FlereAksjer> FlereAksjer { get; set; }
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

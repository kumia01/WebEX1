namespace ghostproject.Models
{
    public class Transaksjoner
    {
        public int Id { get; set; }
        public int Pris { get; set; }
        public int Volum { get; set; }
        public string Dato { get; set; }
        public bool Kjop { get; set; }
        virtual public Brukere Brukere { get; set; }
        virtual public Aksje Aksje { get; set; }
    }
}

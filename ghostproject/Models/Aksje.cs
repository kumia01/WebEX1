using System.Collections.Generic;

namespace ghostproject.Models
{
    public class Aksje
    {
        public int Id { get; set; }
        public string Ticker { get; set; }
        public string Selskap { get; set; }
        public int Pris { get; set; }
        public int P1 { get; set; }
        public int P2 { get; set; }
        public int P3 { get; set; }
        public int P4 { get; set; }
        public int P5 { get; set; }
        public int P6 { get; set; }
        public int P7 { get; set; }

        virtual public List<Transaksjoner> Transaksjoner { get; set; }
    }
}

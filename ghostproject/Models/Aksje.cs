﻿using System.Collections.Generic;

namespace ghostproject.Models
{
    public class Aksje
    {
        public int Id { get; set; }
        public string Ticker { get; set; }
        public string Selskap { get; set; }
        public int Pris { get; set; }
        public int gammelPris { get; set; }

    }
}

namespace ghostproject.Models
{
    public class Transaksjon
    {
        public int Id { get; set; }
        public int Volum { get; set; }
        public int Pris { get; set; }
        public int BrukereId { get; set; }
        public int FlereAksjerId { get; set; }
    }
}

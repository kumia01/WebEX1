using ghostproject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace ghostproject.Controllers
{
    [Route("[controller]/[action]")]
    public class TransaksjonController : ControllerBase
    {
        private readonly DB _db;
        public TransaksjonController(DB db)
        {
            _db = db;
        }



        public async Task<bool> Lagre(Transaksjon innTransaksjon)
        {
            try
            {
                var nyTransaksjonsRad = new Transaksjoner();
                nyTransaksjonsRad.Volum = innTransaksjon.Volum;
                nyTransaksjonsRad.Pris = innTransaksjon.Pris;
                nyTransaksjonsRad.BrukereId = innTransaksjon.BrukereId;
                nyTransaksjonsRad.AksjeId = innTransaksjon.AksjeId;
                

                _db.Transaksjoner.Add(nyTransaksjonsRad);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<Transaksjon>> HentAlle()
        {
            try
            {
                List<Transaksjon> alleTransaksjoner = await _db.Transaksjoner.Select(t => new Transaksjon
                {
                    Id = t.Id,
                    Volum = t.Volum,
                    Pris = t.Pris,
                    BrukereId = t.BrukereId,
                    AksjeId = t.AksjeId

                }).ToListAsync();
                return alleTransaksjoner;
            }
            catch
            {
                return null;
            }

        }

        /*public async Task<List<Transaksjon>> HentAlleBrukerTransaksjoner(int brukerId)
        {
            try
            {
                //List<Transaksjoner> alleTransaksjoner = new List<Transaksjoner>();
                Transaksjoner enTransaksjon = await _db.Transaksjoner.FindAsync(brukerId);
                var alleTransaksjoner = new List<Transaksjoner>(
                    from Transaksjoner in _db.Transaksjoner
                    where Transaksjoner.BrukereId == brukerId
                    select Transaksjoner
                    ).ToListAsync();

                return alleTransaksjoner;

                /*Transaksjon alleTransaksjoner = await _db.Transaksjoner.Select(t => t.BrukereId == brukerId).ToListAsync();

                return alleTransaksjoner;*/
                
            }

        }
    }
}

using ghostproject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using System.Collections.Generic;


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
                nyTransaksjonsRad.Brukere = innTransaksjon.Bru
                
                _db.Transaksjoner.Add(nyTransaksjonsRad);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}

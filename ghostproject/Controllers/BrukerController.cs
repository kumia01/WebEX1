using ghostproject.DBModels;
using ghostproject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ghostproject.Controllers


    [Route("[controller]/[action]")]
    public class BrukerController : ControllerBase
    {
        private readonly DBbruker _db;

        public BrukerController(DBbruker db)
        {
            _db = db;
        }
        public async Task<bool> Lagre (Bruker innBruker)
        {

            try
            {
                _db.Bruker.Add(innBruker);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<List<Bruker>> HentAlle()
        {
            try
            {
                List<Bruker> alleBrukere = await _db.Bruker.Select(b => new Bruker)
                {
                    Id = b.Id,
                    Fornavn = b.Fornavn,
                    Etternavn = b.Etternavn,
                    Addresse = b.Addresse,
                    Mail = b.Mail
                    
                }).ToListAsync();
            }
            catch
            {
                return null;
            }
        }
        public async Task<bool> Slett(int id)
        {
            try
            {
                Bruker enBruker = await _db.Bruker.FindAsync(id);
                _db.Bruker.Remove(enBruker);
                await _db.SaveChangesAsync();
                return true 
            }
            catch
            {
                return false;
            }
        }


        public async Task<Bruker> HentEn(int id)
        {
            try
            {
                Bruker enBruker = await _db.Bruker.FindAsync(id);
                return enBruker;
            }
            catch
            {
                return null;
            }
        }
    }
}


using ghostproject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ghostproject.Controllers
{

    [Route("[controller]/[action]")]
    public class BrukerController : ControllerBase
    {
        private readonly DB _db;

        public BrukerController(DB db)
        {
            _db = db;
        }

        //Lager en ny rad i brukere tabellen med innbruker når en bruker registrerer en kunde,
        //lager også ny rad i poststeder tabellen om poststed ikke finnes fra før av
        public async Task<bool> Lagre(Bruker innBruker)
        {
            try
            {
                var nyBrukerRad = new Brukere();
                nyBrukerRad.Fornavn = innBruker.Fornavn;
                nyBrukerRad.Etternavn = innBruker.Etternavn;
                nyBrukerRad.Adresse = innBruker.Adresse;

                var sjekkPostnr = await _db.Poststeder.FindAsync(innBruker.Postnr);
                if (sjekkPostnr == null)
                {
                    var poststedsRad = new Poststeder();
                    poststedsRad.Postnr = innBruker.Postnr;
                    poststedsRad.Poststed = innBruker.Poststed;
                    nyBrukerRad.Poststed = poststedsRad;
                }
                else
                {
                    nyBrukerRad.Poststed = sjekkPostnr;
                }
                _db.Brukere.Add(nyBrukerRad);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        //Henter alle brukere fra brukere tabellen i DB, returnerer liste av Bruker objekt
        public async Task<List<Bruker>> HentAlle()
        {
            try
            {
                List<Bruker> alleBrukere = await _db.Brukere.Select(b => new Bruker
                {
                    Id = b.Id,
                    Fornavn = b.Fornavn,
                    Etternavn = b.Etternavn,
                    Adresse = b.Adresse,
                    Postnr = b.Poststed.Postnr,
                    Poststed = b.Poststed.Poststed
                }).ToListAsync();
                return alleBrukere;
            }
            catch
            {
                return null;
            }
        }

        //Sletter en brukerrad ved hjelp av bruker id
        public async Task<bool>Slett(int id)
        {
            try
            {
                Brukere enDBBruker = await _db.Brukere.FindAsync(id);
                _db.Brukere.Remove(enDBBruker);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        //Henter en bruker fra DB ve hjelp av bruker id
        public async Task<Bruker> HentEn(int id)
        {
            Brukere enBruker = await _db.Brukere.FindAsync(id);
            var hentetBruker = new Bruker()
            {
                Id = enBruker.Id,
                //Personnr = enBruker.Personnr,
                Fornavn = enBruker.Fornavn,
                Etternavn = enBruker.Etternavn,
                Adresse = enBruker.Adresse,
                Postnr = enBruker.Poststed.Postnr,
                Poststed = enBruker.Poststed.Poststed
            };
            return hentetBruker;
        }

        //Endrer en bruker ved hjelp av bruker id og redigerer brukerraden i DB
        public async Task<bool> Endre(Bruker endreBruker)
        {
            try
            {
                var endreObjekt = await _db.Brukere.FindAsync(endreBruker.Id);
                if (endreObjekt.Poststed.Postnr != endreBruker.Postnr)
                {
                    var sjekkPostnr = _db.Poststeder.Find(endreBruker.Postnr);
                    if (sjekkPostnr == null)
                    {
                        var poststedsRad = new Poststeder();
                        poststedsRad.Postnr = endreBruker.Postnr;
                        poststedsRad.Poststed = endreBruker.Poststed;
                        endreObjekt.Poststed = poststedsRad;
                    }
                    else
                    {
                        endreObjekt.Poststed.Postnr = endreBruker.Postnr;
                    }
                }
                endreObjekt.Fornavn = endreBruker.Fornavn;
                endreObjekt.Etternavn = endreBruker.Etternavn;
                endreObjekt.Adresse = endreBruker.Adresse;
                await _db.SaveChangesAsync();
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}

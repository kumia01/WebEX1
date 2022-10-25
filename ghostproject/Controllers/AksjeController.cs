using ghostproject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ghostproject.Controllers
{

    [Route("[controller]/[action]")]
    public class AksjeController : ControllerBase
    {
        private readonly DB _dbAksje;

        public AksjeController(DB db)
        {
            _dbAksje = db;
        }

        public async Task<List<Aksje>> HentAlle()
        {
            try
            {
                List<Aksje> alleAksjer = await _dbAksje.FlereAksjer.Select(b => new Aksje
                {
                    Id = b.Id,
                    Ticker = b.Ticker,
                    Selskap = b.Selskap,
                    Pris = b.Pris,
                    gammelPris = b.gammelPris

                }).ToListAsync();
                
                return alleAksjer;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Aksje> HentEn(int id)
        {
            FlereAksjer enAksje = await _dbAksje.FlereAksjer.FindAsync(id);
            var hentetAskje = new Aksje()
            {
                Id = enAksje.Id,
                Ticker = enAksje.Ticker,
                Selskap = enAksje.Selskap,
                Pris = enAksje.Pris,
                gammelPris = enAksje.gammelPris
            };
            return hentetAskje;
        }

        public async void endrePris()
        {
            List<Aksje> alleAksjer = await _dbAksje.FlereAksjer.Select(b => new Aksje
            {
                Id = b.Id
            }).ToListAsync();
            foreach (Aksje i in alleAksjer)
            {
                Random rand = new Random();
                var endreobjekt = await _dbAksje.FlereAksjer.FindAsync(i.Id);
                endreobjekt.gammelPris = endreobjekt.Pris;
                int nyPris = Convert.ToInt32(endreobjekt.Pris * NextDouble(rand, 1.2,0.8,2));
                endreobjekt.Pris = nyPris;


            }
            await _dbAksje.SaveChangesAsync();
        }

        private double NextDouble(Random rand, double minVerdi, double maxVerdi, int runde)
        {
            double randNummber = rand.NextDouble() * (maxVerdi - minVerdi) + minVerdi;
            return Convert.ToDouble(randNummber.ToString("f" + runde));
        }
       
        
    }
}
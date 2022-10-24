﻿using ghostproject.Models;
using Microsoft.AspNetCore.Mvc;
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
                    AksjeId = t.AksjeId,

                }).ToListAsync();
                return alleTransaksjoner;
            }
            catch
            {
                return null;
            }

        }
    }
}

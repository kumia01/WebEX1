﻿using ghostproject.Models;
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
                nyTransaksjonsRad.FlereAksjerId = innTransaksjon.FlereAksjerId;


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
                    FlereAksjerId = t.FlereAksjerId

                }).ToListAsync();
                return alleTransaksjoner;
            }
            catch
            {
                return null;
            }

        }

        public async Task<List<Transaksjon>> HentBrukerTransaksjoner(int brukerId)
        {
            try
            {
                List<Transaksjon> alleTransaksjoner = await _db.Transaksjoner.Select(t => new Transaksjon
                {
                    Id = t.Id,
                    Volum = t.Volum,
                    Pris = t.Pris,
                    BrukereId = t.BrukereId,
                    FlereAksjerId = t.FlereAksjerId
                }).Where(t => t.BrukereId == brukerId).ToListAsync();
                return alleTransaksjoner;

            }
            catch
            {
                return null;
            }

        }

        public async Task<List<Transaksjon>> HentAksjeTransaksjoner(int aksjeId)
        {
            try
            {
                List<Transaksjon> alleTransaksjoner = await _db.Transaksjoner.Select(t => new Transaksjon
                {
                    Id = t.Id,
                    Volum = t.Volum,
                    Pris = t.Pris,
                    BrukereId = t.BrukereId,
                    FlereAksjerId = t.FlereAksjerId
                }).Where(t => t.FlereAksjerId == aksjeId).ToListAsync();
                return alleTransaksjoner;

            }
            catch
            {
                return null;
            }
        }
    }
}
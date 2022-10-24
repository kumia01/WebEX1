using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System;
using System.Reflection;
using System.Linq;
using System.Threading.Tasks;
using ghostproject.Models;
using Microsoft.AspNetCore.Mvc;


namespace ghostproject.Models
{
    public static class DBinit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DB>();

                // må slette og opprette databasen hver gang når den skalinitieres (seed`es)
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                var poststed1 = new Poststeder { Postnr = "0372", Poststed = "Oslo" };
                var aksje1 = new Aksje { Ticker = "NOK", Selskap = "Norske Kroner", Pris = 20 };
                var bruker1 = new Brukere { Fornavn = "Ole", Etternavn = "Hansen", Adresse = "Olsloveien 82", Poststed = poststed1 };

                var transaksjon1 = new Transaksjoner { Pris = aksje1.Pris, Volum = 200 };
                var transaksjon2 = new Transaksjoner { Pris = aksje1.Pris, Volum = 200 };


                var nyTransaksjon = new List<Transaksjoner>();
                nyTransaksjon.Add(transaksjon1);
                nyTransaksjon.Add(transaksjon2);
                bruker1.Transaksjoner = nyTransaksjon;
                aksje1.Transaksjoner = nyTransaksjon;


                //context.Poststeder.Add(poststed1);


                context.Brukere.Add(bruker1);
                context.Aksje.Add(aksje1);

                context.SaveChanges();
            }
        }
    }
}

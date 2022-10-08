using ghostproject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ghostproject.Controllers
{

    [Route("[controller]/[action]")]
    public class AksjeController : ControllerBase
    {
        public List<Aksje> Aksje;
        public bool Lagre(Aksje innAkjse)
        {

            try
            {
                Aksje.Add(innAkjse);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
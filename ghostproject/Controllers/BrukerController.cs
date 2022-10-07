using ghostproject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ghostproject.Controllers
{

    [Route("[controller]/[action]")]
    public class BrukerController : ControllerBase
    {
        public List<Bruker> Bruker;
        public bool Lagre (Bruker innBruker)
        {

            try
            {
                Bruker.Add(innBruker);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}

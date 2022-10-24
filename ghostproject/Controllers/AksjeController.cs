using ghostproject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ghostproject.Controllers
{

    [Route("[controller]/[action]")]
    public class AksjeController : ControllerBase
    {
        private readonly AksjeController _dbAksje;

        public AksjeController(DB Aksje)
        {
            _dbAksje = dbAksje;
        }

        public async Task<List<Aksje>> HentAlle()
        {
            try
            {

            }
            catch
            {

            }
        }
        
    }
}
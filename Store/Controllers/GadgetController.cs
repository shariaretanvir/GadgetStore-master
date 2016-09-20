using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Domain;
using DataAccess;

namespace Store.Controllers
{
    public class GadgetController : ApiController
    {
        private StoreContext db = new StoreContext();

        // GET api/Gadget
        public GadgetsContainer GetGadgets(int currentPage, int recordsPerPage, int category)
        {
            var pageNumber = currentPage;
            var pagesize = recordsPerPage;

            var begin = (pageNumber - 1) * pagesize;
            var gadgets = new List<Gadget>();
            var totalPage = 0;
            if (category == 0)
            {
                gadgets = db.Gadgets.OrderBy(x => x.GadgetId).Skip(begin).Take(pagesize).ToList();
                totalPage = db.Gadgets.Count();
            }
            else
            {
                gadgets = db.Gadgets.Where(c => c.CategoryId == category).OrderBy(x => x.GadgetId).Skip(begin).Take(pagesize).ToList();
                totalPage = db.Gadgets.Where(c => c.CategoryId == category).Count();
            }
            //var gadgets = db.Gadgets.Where(c => c.CategoryId == category).OrderBy(x => x.GadgetId).Skip(begin).Take(pagesize).ToList();

            GadgetsContainer aGadgetsContainer = new GadgetsContainer
            {
                Gadgets = gadgets,
                TotalGadgets = totalPage
            };


            return aGadgetsContainer;
        }


        // GET api/Gadget/5
        //[Route("api/Gadget/GetGadget/{id}")]
        public  List<Gadget> GetGadget(int id)
        {
            return  db.Gadgets.Where(x=>x.CategoryId == id).ToList();
            
        }


        [ResponseType(typeof(Gadget))]
        public async Task<IHttpActionResult> GetGadgetBycata(int cataid)
        {
            Gadget gadget = await db.Gadgets.FindAsync(cataid);
            if (gadget == null)
            {
                return NotFound();
            }

            return Ok(gadget);
        }

        // PUT api/Gadget/5
        public async Task<IHttpActionResult> PutGadget(int id, Gadget gadget)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gadget.GadgetId)
            {
                return BadRequest();
            }

            db.Entry(gadget).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GadgetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Gadget
        [ResponseType(typeof(Gadget))]
        public async Task<IHttpActionResult> PostGadget(Gadget gadget)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Gadgets.Add(gadget);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = gadget.GadgetId }, gadget);
        }

        // DELETE api/Gadget/5
        [ResponseType(typeof(Gadget))]
        public async Task<IHttpActionResult> DeleteGadget(int id)
        {
            Gadget gadget = await db.Gadgets.FindAsync(id);
            if (gadget == null)
            {
                return NotFound();
            }

            db.Gadgets.Remove(gadget);
            await db.SaveChangesAsync();

            return Ok(gadget);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GadgetExists(int id)
        {
            return db.Gadgets.Count(e => e.GadgetId == id) > 0;
        }
    }


    public class GadgetsContainer
    {
        public List<Gadget> Gadgets { get; set; }
        public int TotalGadgets { get; set; }
    }
}
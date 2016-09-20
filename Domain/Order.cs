﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Order
    {
        public Order()
        {
            //this.Gadgets = new HashSet<Gadget>();
            Gadgets = new List<Gadget>();
        }

        public int OrderId { get; set; }
        public string CompanyName { get; set; }
        public string OwnerName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }

        public virtual List<Gadget> Gadgets { get; set; }
    }
}

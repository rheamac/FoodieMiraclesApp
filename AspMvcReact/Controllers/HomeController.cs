using AspMvcReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AspMvcReact.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            // To create database table if it is not already created
            //AppDbContext c = new AppDbContext();
            //c.Database.CreateIfNotExists();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
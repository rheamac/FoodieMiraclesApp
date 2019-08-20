using AspMvcReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AspMvcReact.Controllers
{
    public class DataController : Controller
    {
        public IList<FoodItem> menuItems;
        // GET: Data
        [HttpGet]
        public ActionResult GetMenuList()
        {
            menuItems = new List<FoodItem>();
            using(var db = new AppDbContext())
            {
                foreach(var fd in db.FoodItems)
                {
                    menuItems.Add(fd);
                }
                
            }
            return Json(menuItems, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        [AuthorizeFoodMiracles]
        public string GetUserId()
        {
            int uid = -1;
            if (Session["UserId"] != null)
                uid = Convert.ToInt32(Session["UserId"].ToString());
            return uid.ToString();
        }
        [HttpPost]
        [AuthorizeFoodMiracles]
        public ActionResult PlaceOrder(IList<FoodItem> items, int id)
        {
            bool dbSuceess = false;
            try {
                using (var db = new AppDbContext())
                {
                    Order o = new Order();
                    o.CustomerId = id;
                    o.OrderDate = DateTime.Now;

                    db.Orders.Add(o);
                    db.SaveChanges();

                    int orderId = o.Id;
                    decimal grandTotal = 0;
                    foreach (var f in items)
                    {
                        OrderDetails orderDetails = new OrderDetails
                        {
                            OrderId = orderId,
                            FoodItemId = f.Id,
                            Quantity = f.Quantity,
                            TotalPrice = f.Price * f.Quantity,
                        };
                        db.OrderDetails.Add(orderDetails);
                        grandTotal += orderDetails.TotalPrice;
                    }
                    o.TotalPaid = grandTotal;
                    o.Status = 1;
                    o.OrderDate = DateTime.Now;
                    db.SaveChanges();
                    dbSuceess = true;
                }
            } catch(Exception ex)
            {
                dbSuceess = false;

            }
            if (dbSuceess)
                return Json("sucess true", JsonRequestBehavior.AllowGet);
            else
                return Json("sucess false", JsonRequestBehavior.AllowGet);

        }

        public class AuthorizeFoodMiracles : AuthorizeAttribute
        {
            protected override bool AuthorizeCore(HttpContextBase httpContext)
            {
                if (httpContext == null) throw new ArgumentNullException("httpContext");

                // Make sure the user logged in.
                if (httpContext.Session["Email"] == null)
                {
                    return false;
                }

                // Do you own custom stuff here
                // Check if the user is allowed to Access resources;

                return true;
            }

            public override void OnAuthorization(AuthorizationContext filterContext)
            {
                base.OnAuthorization(filterContext);

                if (this.AuthorizeCore(filterContext.HttpContext) == false)
                {
                    filterContext.Result = new RedirectResult("/Account/Login/?ret=" + filterContext.HttpContext.Request.CurrentExecutionFilePath);
                }
            }
        }
    }
}
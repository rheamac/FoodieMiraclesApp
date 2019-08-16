using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AspMvcReact.Startup))]
namespace AspMvcReact
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

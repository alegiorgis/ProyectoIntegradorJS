

class Router {
    constructor(app){
      $(window).on("hashchange", e => this.onRouteChange(e));
      $(window).on("load", e => this.onRouteChange(e));
      
      this.routes = ["usuario", "todas", "catering", "decoracion", "fotos", "invitados", "otros"] 
      this.slot = $("#cards");
      this.app = app;
    }
  
    customRoute(route){
      window.location.hash = "/" + route;
      this.loadContent(route);
      this.onRouteChange();
    }
  
    onRouteChange(e) {  
      const hashLocation = window.location.hash.substring(2);
  
      if (!this.routes.includes(hashLocation)){
        this.error404()
      } else if (hashLocation == "usuario" && !localStorage.getItem('usuario')){
        mostrarFormularioUsuario(crearNuevoUsuario)
      } else if(hashLocation == "usuario" && localStorage.getItem('usuario')){
          this.customRoute("todas")
      } else {
        this.loadContent(hashLocation);
        $(".links").children().removeClass("link--active")
        $(`#link__${hashLocation}`).addClass("link--active")
      }
   
    }
  
    loadContent(filtro) {
      const contenido = this.app.filtrar(filtro);
      this.updateSlot(contenido);
    }
  
    updateSlot(content) {
      this.slot.html(content);
    }
  
    error404() {
      $("main").html(`
                        <h1>ERROR 404</h1>
                        <p>La página solicitada no existe</p>
                    `)
    }
  }
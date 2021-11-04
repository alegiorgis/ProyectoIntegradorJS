//localStorage.clear()
$("#deadline_tarea").datepicker();


const router = new Router(new TareasController(new TareasModel(), new TareasView()));

//Si hay un usuario en local storage lo carga
if(localStorage.getItem('usuario')) {
 cargarUsuario();
 router.customRoute("todas");  

 //Si NO hay un usuario en local storage  presenta el formulario
} else {
 router.customRoute("usuario");
}




$("#agregarTarea").click(mostrarFormularioTareas);
$("#cargaTarea__form").submit((event)=>{ 
                                   event.preventDefault();
                                   router.app.agregar();
                                   router.customRoute("todas")  
                               }
                                   );



$("#ordenarTareas").change( () => router.onRouteChange())

$("#dashboard__borrarDatos").on('click', (e)=> {
 localStorage.clear();
 location.reload();
 });
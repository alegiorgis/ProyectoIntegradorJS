class Usuario {
    constructor(nombre, ocupacion) {
        this.nombre = nombre;
        this.ocupacion = ocupacion;
        this.ubicacion = ""
    }

    mostrarUsuario(){
        $("#dashboard__user").html(`
        <h3>${this.nombre}</h3>
        <p>${this.ocupacion}</p>
        <p id="location"></p>
        `)
    }

    guardarUsuario() {
        localStorage.setItem('usuario', JSON.stringify(this));
    }
}


let usuario;

function crearNuevoUsuario(event) {
    event.preventDefault();
    window.location.reload();
    usuario = new Usuario($("#usuario_nombre").val(), $("#usuario_ocupacion").val());
    usuario.guardarUsuario();  
    usuario.mostrarUsuario();
    ocultarFormularioUsuario(window.location.reload())
    mostrarGlassPanel();
}

function cargarUsuario(){
    let _usuario = JSON.parse(localStorage.getItem('usuario'));
    usuario = new Usuario(_usuario.nombre, _usuario.ocupacion); 
    usuario.mostrarUsuario();
    mostrarGlassPanel();
}


//Funciones de la interfaz para mostar y ocultar tanto formulario como el glass del panel

//Animacion concatenada con FadeIn para mostrar el formulario del usuario
function mostrarFormularioUsuario(callback) {
    $("#welcome").fadeIn(1000);   
    $("#welcome__form").submit(callback);
}

//Animacion concatenada con FadeOut para ocultar el formulario del usuario
function ocultarFormularioUsuario(callback){
    $("#welcome").fadeOut(500, callback)
}


//Animacion concatenada con SlideDown para "deslizar"
function mostrarGlassPanel() {
    $("#glass").css('opacity', 0)
                .slideDown('slow')
                 .animate(
                            { opacity: 1 },
                                '1000'
                        );    
}


//Animacion concatenada con FadeOut para ocultar el glasspanel
function ocultarGlassPanel(callback) {
    $("#glass").fadeOut(500, callback)
}


//Animacion concatenada con FadeIn para mostrar el formulario de las tareas (incluye slidedown)
function mostrarFormularioTareas() {
    $("#grayOverlay").fadeIn(500, function() {
        $("#cargaTarea").slideDown()  
    })
}

//Animacion concatenada con FadeOut para ocultar el formulario de las tareas (incluye slideup)

function ocultarFormularioTareas(){
    $("#cargaTarea").slideUp();
    $("#grayOverlay").fadeOut(1000);    
}

$("#deadline_tarea").datepicker();
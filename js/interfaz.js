
function mostrarFormularioUsuario(callback) {
    $("#welcome").fadeIn(1000);   
    $("#welcome__form").submit(callback);
}

function ocultarFormularioUsuario(callback){
    $("#welcome").fadeOut(500, callback)
}

function mostrarGlassPanel() {
    $("#glass").css('opacity', 0)
                .slideDown('slow')
                 .animate(
                            { opacity: 1 },
                                '1000'
                        );    
}

function ocultarGlassPanel(callback) {
    $("#glass").fadeOut(500, callback)
}

function mostrarFormularioTareas() {
    $("#grayOverlay").fadeIn(500, function() {
        $("#cargaTarea").slideDown()  
    })
}

function ocultarFormularioTareas(){
    $("#cargaTarea").slideUp();
    $("#grayOverlay").fadeOut(1000);    
}

$("#deadline_tarea").datepicker();
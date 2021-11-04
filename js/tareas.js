class Tarea {
    constructor(categoria, nombre, descripcion, prioridad, imagen, deadline, id) {
    this.nombre = nombre;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.prioridad = [prioridad,
                        ((prioridad)=> {
                            if (prioridad === "alta") return 1;
                            else if (prioridad === "media") return 2;
                            else return 3;
                        })(prioridad)]
    this.imagen = imagen;
    this.deadline = deadline;
    this.id = `tarea_${id}`;
    }  
}

class TareasModel  {
    constructor(){
        this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        this.idTareas = parseInt(localStorage.getItem('idTareas')) || 0;
    }

    guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
        localStorage.setItem('idTareas', this.idTareas)
      }

    agregarTarea(categoria, nombre, descripcion, prioridad, imagen, deadline) {
        this.idTareas += 1;
        this.tareas.push(new Tarea(categoria, nombre, descripcion, prioridad, imagen, deadline, this.idTareas));
        this.guardarTareas();
    } 

    eliminarTarea(id) {    
        this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
        this.guardarTareas();
      }
    
}


class TareasView {

    constructor(){
        this.html = '';
        this.tareasFiltradas = [];
    }

   listarTareas(filtro, tareas){
        this.html = '';

       if (filtro !=="todas"){
            this.tareasFiltradas = tareas.filter(tarea => tarea.categoria == filtro);
        } else {
           this.tareasFiltradas = tareas;
        }
        
        this.tareasFiltradas = this.ordenarTareas($("select#ordenarTareas" ).val(), this.tareasFiltradas) 

        if(this.tareasFiltradas.length > 0) {
            for (const tarea of this.tareasFiltradas) {
                this.html+=`<div class="card">
                           <div class="card-img">
                               <img src="${tarea.imagen}" alt="">
                           </div>
                           <div class="card-info">
                               <h2>${tarea.nombre}</h2>
                               <p>${tarea.descripcion}</p>
                               <p class="card-info__deadline"><span>${moment(tarea.deadline).format('dddd')}</span> ${moment(tarea.deadline).format('LL')}</p>
                           </div>
                           <h2 class="prioridad">PRIORIDAD ${tarea.prioridad[0]}</h2>
                           <i class="uis uis-check-circle completarTarea" id="${tarea.id}"></i>
                       </div>`;
               
           }
        } else {
            this.html = `   <div id="noHayTareas">
                                <p>Aún no hay tareas por aquí</p>
                            </div>
                        `
        }
   
        return this.html;
    }

    ordenarTareas(criterio, arrayTareas) {

        let tareasOrdenadas = [];
        switch(criterio) {
            case "carga_ultimo":           
                tareasOrdenadas = arrayTareas.sort((a, b) => {
                    if(parseInt(a.id.substring(6)) <  parseInt(b.id.substring(6))) {
                        return 1;
                    } else return -1;           
                });
                break;
            case "carga_primero":
                tareasOrdenadas = arrayTareas.sort((a, b) => {
                    if(parseInt(a.id.substring(6)) >  parseInt(b.id.substring(6))) {
                        return 1;
                    } else return -1;           
                });
                break;
            case "prioridad_mayor":
                tareasOrdenadas = arrayTareas.sort((a, b) => {
                    if(a.prioridad[1] >  b.prioridad[1]) {
                        return 1;
                    } else return -1;           
                });
                break;
            case "prioridad_menor":
                tareasOrdenadas = arrayTareas.sort((a, b) => {
                    if(a.prioridad[1] <  b.prioridad[1]) {
                        return 1;
                    } else return -1;           
                });
                break;
            case "deadline_masProximo":
                tareasOrdenadas = arrayTareas.sort((a, b) => {
                    if(Date.parse(a.deadline) >  Date.parse(b.deadline)) {
                        return 1;
                    } else return -1;           
                });
                break;
            case "deadline_menosProximo":
                tareasOrdenadas = arrayTareas.sort((a, b) => {
                    if(Date.parse(a.deadline) <  Date.parse(b.deadline)) {
                        return 1;
                    } else return -1;           
                });
                break;           
            default:
                console.log("error")
        }

        return tareasOrdenadas;
    }

}

class TareasController {
    constructor(tareasModel, tareasView) {
        this.tareasModel = tareasModel;
        this.tareasView = tareasView;    
    }

    filtrar(filtro) {
        let resultado = this.tareasView.listarTareas(filtro, this.tareasModel.tareas);
        this.eventoBorrado(this.tareasView.tareasFiltradas);
        return resultado;
    }

    eventoBorrado(tareas){
        for (const tarea of tareas) {
            $(document).on('click',`#${tarea.id}`, (e) => {
                $(`#${tarea.id}`).parent().fadeOut(600, ()=>{
                        this.tareasModel.eliminarTarea(tarea.id);
                        $(`#${tarea.id}`).parent().remove();
                        })      
                    }
                )          
        }
    }

    agregar(){
        ocultarFormularioTareas(); 
        this.tareasModel.agregarTarea(
            $("#categoria_tarea").val(), 
            $("#nombre_tarea").val(), 
            $("#descripcion_tarea").val(), 
            $("#prioridad_tarea").val(), 
            `img/${$("#categoria_tarea").val()}_logo.svg`,
            $("#deadline_tarea").val()
        )

        this.tareasModel.guardarTareas();

    }
  

}




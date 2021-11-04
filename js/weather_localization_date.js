// //Obtener la posición y el clima
const myKey = "d2f51c3b5f9ab0da898d46012c4c6c30";




  if(navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat =  position.coords.latitude
        let lon = position.coords.longitude

       fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&mode=json&units=metric&appid=${myKey}`)
          .then(response => response.json())
          .then(data => climaLocalizacion(data))
        .catch(err => console.log("No se ha podido acceder a su ubicación"))   
                       
    })
  }

 




// Manipulacion de la data del clima y localización
const climaLocalizacion = (_data) => {
  usuario.ubicacion = `${_data.name}, ${_data.sys.country}`
  $("#location").text(usuario.ubicacion)
  $("#tareas__header__fechaClima").append(
    `<div id="clima">
      <img id="iconoClima" src="http://openweathermap.org/img/wn/${_data.weather[0].icon}.png" alt="Icono del clima">
      <p>${(Math.round(_data.main.temp * 10) / 10)}°</p>
    </div>
    `
  )
}


//Fecha y hora
moment.locale('es')
$("#tareas__header__fechaClima").prepend(
  `<p id="fecha_hora">${moment().format('dddd')} ${moment().format('LL')}</p>
  `
)

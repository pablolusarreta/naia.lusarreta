const idioma = ["castellano.json", "catalan.json", "euskera.json", "ingles.json"]
const idioma_sel = 0
const ico_contacto = ['telefono.png', 'email.png', 'direccion.png']
// FECHA
const fechaActualCast = () => {
    const hoy = new Date()
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    return (`${diasSemana[hoy.getDay()]}, ${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`)
}
const fecha_actual = [fechaActualCast, fechaActualCast, fechaActualCast, fechaActualCast]
// MOVIL
const movil = () => {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        document.getElementById("estilo").setAttribute('href', 'movil.css')
    }
}

const inicio = () => {
    document.getElementById("fecha").innerHTML = fecha_actual[idioma_sel]()
    fetch(idioma[idioma_sel])
        .then(response => response.json())
        .then(data => {
            console.log(data, Object.keys(data))
        // CUERPO
            //Experiencia laboral
            document.getElementById("cuerpo").innerHTML = `<h1>${Object.keys(data)[0]}</h1>`
            for (const i in data[Object.keys(data)[0]]) {
                document.getElementById("cuerpo").innerHTML +=
                    `<div>
                    <h1>${data[Object.keys(data)[0]][i].Puesto}</h1>
                    <h2>${data[Object.keys(data)[0]][i].Empresa}<span>${data[Object.keys(data)[0]][i].Fecha}</span></h2>
                    <p>${data[Object.keys(data)[0]][i].Descripción}</p>
                </div>`
            }
            //Datos académicos
            document.getElementById("cuerpo").innerHTML += `<hr><h1>${Object.keys(data)[1]}</h1>`
            for (const i in data[Object.keys(data)[1]]) {
                document.getElementById("cuerpo").innerHTML +=
                    `<div>
                    <h1>${data[Object.keys(data)[1]][i].Título} | ${data[Object.keys(data)[1]][i].Fecha}</span></h2>
                    <p>${data[Object.keys(data)[1]][i].Institución}</p></h1>
                    <h2>${data[Object.keys(data)[1]][i].Descripción}<span>
                </div>`
            }
        // LATERAL
            // Contacto
            document.getElementById("lateral").innerHTML = `<img src="img/perfil.png">`
            document.getElementById("lateral").innerHTML += `<hr><h1>${Object.keys(data)[5]}</h1>`
            for (const i in data[Object.keys(data)[5]]) {
                document.getElementById("lateral").innerHTML +=
                    `<div>
                    <h1><img src="img/${ico_contacto[i]}">${data[Object.keys(data)[5]][i].Descripción}</h1>
                </div>`
            }
            // Perfil personal
            document.getElementById("lateral").innerHTML +=
                `<hr><h1>${Object.keys(data)[3]}</h1>
                <div><h1>${data[Object.keys(data)[3]]}</h1>
            </div>`
            // Idiomas
            document.getElementById("lateral").innerHTML += `<hr><h1>${Object.keys(data)[2]}</h1>`
            for (const i in data[Object.keys(data)[2]]) {
                document.getElementById("lateral").innerHTML +=
                    `<div>
                    <h1> ·&nbsp;&nbsp;${data[Object.keys(data)[2]][i].Lengua}<h1> : <h2>${data[Object.keys(data)[2]][i].Nivel}</h2>
                </div>`
            }
            // Certificados
            document.getElementById("lateral").innerHTML += `<hr><h1>${Object.keys(data)[4]}</h1>`
            for (const i in data[Object.keys(data)[4]]) {
                document.getElementById("lateral").innerHTML +=
                    `<div>
                    <h1> ·&nbsp;&nbsp;${data[Object.keys(data)[4]][i].Descripción}</h1>
                </div>`
            }
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}


window.onload = inicio
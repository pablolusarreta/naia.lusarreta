const idioma = ["castellano.json", "catalan.json", "euskera.json", "ingles.json"]
const idioma_sel = 0
const ico_contacto = ['telefono.png','whatsapp.png', 'email.png', 'direccion.png']
const url_contacto = ['tel:+34688813237','https://api.whatsapp.com/send?phone=688813237&text=','mailto:nlusarreta001@grnáil.com','https://www.google.es/maps/place/C%2F+de+Proven%C3%A7a,+192,+08036+Barcelona/@41.3893501,2.1546554,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a28f8661f6bb:0x33c70a148d56a719!8m2!3d41.3893501!4d2.1546554!16s%2Fg%2F11bw3_pfhg?hl=es&authuser=0&entry=ttu']
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
                    <a href="${url_contacto[i]}"><h1 ><img src="img/${ico_contacto[i]}">${data[Object.keys(data)[5]][i].Descripción}</h1></a>
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

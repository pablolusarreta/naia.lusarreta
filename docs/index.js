let IDS = 0
const idioma = [
    ["castellano.json", "es-ES", "Castellano"],
    ["catalan.json", "ca-ES", "Catalá"],
    ["euskera.json", "eu-ES", "Euskara"],
    ["ingles.json", "en-US", "English"]
]

const ico_contacto = ['telefono.png', 'whatsapp.png', 'email.png', 'direccion.png']
const url_contacto = [
    'tel:+34688813237',
    'https://api.whatsapp.com/send?phone=688813237&text=',
    'mailto:nlusarreta001@grnáil.com',
    'https://maps.app.goo.gl/GokDvkYpT3CkmwLLA'
]
// MOVILES
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
// FECHA
const fechaActual = () => {
    const fecha = new Date();
    const formato = new Intl.DateTimeFormat(idioma[IDS][1], {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    document.getElementById("fecha").innerHTML = formato.format(fecha);
}
// IDIOMA
const idiomas = () => {
    let S = ''
    for (const i in idioma) {
        const sel = Number(i) == IDS ? ' selected ' : ''
        S += `<option value="${i}" ${sel}>${idioma[i][2]}&nbsp;&nbsp;</option>`
    }
    document.getElementById("idioma").innerHTML = S
}
const estableceIdioma = v => {
    document.getElementsByTagName('body')[0].style.opacity = "0";
    IDS = Number(v)
    setTimeout(inicio, 1000);
}
// I N I C I O
const inicio = () => {
    movil()
    fechaActual()
    idiomas()
    fetch('JSON/' + idioma[IDS][0])
        .then(response => response.json())
        .then(data => {
            document.getElementsByTagName('body')[0].style.opacity = "1";
            // CUERPO
            //Experiencia laboral
            document.getElementById("cuerpo").innerHTML = `<h1>${Object.keys(data)[0]}</h1>`
            for (const i in data[Object.keys(data)[0]]) {
                document.getElementById("cuerpo").innerHTML +=
                    `<div>
                    <h1>${data[Object.keys(data)[0]][i].Puesto}</h1>
                    <h2>${data[Object.keys(data)[0]][i].Empresa} | <span> ${data[Object.keys(data)[0]][i].Fecha}</span></h2>
                    <p>${data[Object.keys(data)[0]][i].Descripción}</p>
                </div>`
            }
            //Datos académicos
            document.getElementById("cuerpo").innerHTML += `<hr><h1>${Object.keys(data)[1]}</h1>`
            for (const i in data[Object.keys(data)[1]]) {
                document.getElementById("cuerpo").innerHTML +=
                    `<div>
                    <h1>${data[Object.keys(data)[1]][i].Título}</h2>
                    <h2>${data[Object.keys(data)[1]][i].Institución} | <span> ${data[Object.keys(data)[1]][i].Fecha}</span></h2>
                    <p>${data[Object.keys(data)[1]][i].Descripción}<p>
                </div>`
            }
            // LATERAL
            // Contacto
            document.getElementById("lateral").innerHTML = `<img src="img/perfil.png">`
            document.getElementById("lateral").innerHTML += `<hr><h1>${Object.keys(data)[5]}</h1>`
            for (const i in data[Object.keys(data)[5]]) {
                document.getElementById("lateral").innerHTML +=
                    `<div>
                    <a href="${url_contacto[i]}" target="_blank"><h1>
                    <img src="img/${ico_contacto[i]}">${data[Object.keys(data)[5]][i].Descripción}</h1></a>
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
                    <h1>${data[Object.keys(data)[2]][i].Lengua}</h1> : <h2>${data[Object.keys(data)[2]][i].Nivel}</h2>
                </div>`
            }
            // Certificados
            document.getElementById("lateral").innerHTML += `<hr><h1>${Object.keys(data)[4]}</h1>`
            for (const i in data[Object.keys(data)[4]]) {
                document.getElementById("lateral").innerHTML +=
                    `<div>
                    <h1>${data[Object.keys(data)[4]][i].Descripción}</h1>
                </div>`
            }
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}


window.onload = inicio

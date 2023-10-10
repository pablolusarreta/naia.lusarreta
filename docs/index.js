let IDS = 0
const idioma = [
    ["castellano.json", "es", "Castellano"],
    ["catalan.json", "ca", "Catalá"],
    ["euskera.json", "eu", "Euskara"],
    ["ingles.json", "en", "English"]
]

const ico_contacto = ['telefono.png', 'whatsapp.png', 'email.png', 'direccion.png']
const url_contacto = [
    'tel:+34688813237',
    'https://api.whatsapp.com/send?phone=688813237&text=',
    'mailto:nlusarreta001@grnáil.com',
    'https://maps.app.goo.gl/GokDvkYpT3CkmwLLA'
]
// FECHA
const fechaActual = () => {
    const fecha = new Date();
    const formato = new Intl.DateTimeFormat(idioma[IDS][1], {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    return formato.format(fecha);
}
// IDIOMA
const idiomas = () => {
    document.getElementById("idioma").innerHTML =''
    for (const i in idioma) {
        const sel = Number(i) == IDS ? ' selected ' :''
        document.getElementById("idioma").innerHTML += `
        <option value="${i}" ${sel}>${idioma[i][2]}&nbsp;&nbsp;<option>`
    }
}
const estableceIdioma = v => {
    IDS = Number(v)
    inicio()
}
// I N I C I O
const inicio = () => {
    document.getElementById("fecha").innerHTML = fechaActual()
    idiomas()
    fetch('JSON/' + idioma[IDS][0])
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
                    <h1><img src="img/flecha.png">${data[Object.keys(data)[2]][i].Lengua}<h1> : <h2>${data[Object.keys(data)[2]][i].Nivel}</h2>
                </div>`
            }
            // Certificados
            document.getElementById("lateral").innerHTML += `<hr><h1>${Object.keys(data)[4]}</h1>`
            for (const i in data[Object.keys(data)[4]]) {
                document.getElementById("lateral").innerHTML +=
                    `<div>
                    <h1><img src="img/flecha.png">${data[Object.keys(data)[4]][i].Descripción}</h1>
                </div>`
            }
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}


window.onload = inicio

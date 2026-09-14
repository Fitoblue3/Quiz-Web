const btnEmpezar = document.querySelector('#btnEmpezar');
const navContainer = document.querySelector('#botonesNav');
const mainhtml = document.querySelector('main')
const preguntasContainer = document.querySelector('.pregunta-container')

let indicePregunta = 0;
let puntaje = 0;
let respuestaUsuario = [];

const preguntas = [
    {
        pregunta: "¿En qué Mundial de la FIFA la Selección de Costa Rica ha llegado más lejos?",
        opciones: ["Italia 1990", "Corea-Japón 2002", "Brasil 2014", "Rusia 2018"],
        correcta: 2
    },
    {
        pregunta: "¿Cuál es considerado el primer videojuego de la historia?",
        opciones: ["Pong", "Tennis for Two", "Space Invaders", "Pac-Man"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál es el ataque clásico e icónico de Goku en Dragon Ball?",
        opciones: ["Kamehameha", "Genkidama", "Kaioken", "Makankosappo"],
        correcta: 0
    },
    {
        pregunta: "¿Cuántas películas de live-action (acción real) de Spider-Man se han estrenado en el cine hasta la fecha?",
        opciones: ["8 películas", "9 películas", "10 películas", "12 películas"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál fue la primera red social de la historia y en qué año fue creada?",
        opciones: ["Facebook(2002)", "SixDegrees (1997)", "Friendster (2002)", "Facebook (2004)"],
        correcta: 1
    }
]

btnEmpezar.addEventListener('click', () => {
    navContainer.style.display = 'flex';
    mainhtml.style.height = '80vh';
    btnEmpezar.style.display = 'none'

    mostrarPreguntas();
});

const mostrarPreguntas = () => {

    preguntasContainer.innerHTML = '';

    const preg = preguntas[indicePregunta];

    //Crear titulo
    const tituloPregunta = document.createElement('h2');
    tituloPregunta.textContent = `${preg.pregunta}`;
    preguntasContainer.appendChild(tituloPregunta);

    //opciones container
    const opcionesDiv = document.createElement('div');
    opcionesDiv.classList.add('opciones-container')

    //opciones
    preg.opciones.forEach((opcionText, index) => {
        const btnOpcion = document.createElement('button');
        btnOpcion.classList.add('btn-opcion');
        btnOpcion.textContent = opcionText;

        btnOpcion.dataset.index = index;

        if (respuestaUsuario[indicePregunta] === index) {
            btnOpcion.classList.add('btn-select')
        } 

        btnOpcion.addEventListener('click', seleccionarRespuesta);
        opcionesDiv.appendChild(btnOpcion);
    });
    
    preguntasContainer.appendChild(opcionesDiv);
};

const seleccionarRespuesta = (Evento) => {
    const opcionSelect = parseInt(Evento.target.dataset.index);
    const allBtns = document.querySelectorAll('.btn-opcion')

    respuestaUsuario[indicePregunta] = opcionSelect;

    allBtns.forEach(btn => btn.classList.remove('btn-select'));

    Evento.target.classList.add('btn-select');

};
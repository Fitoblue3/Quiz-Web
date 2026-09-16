const btnEmpezar = document.querySelector('#btnEmpezar');
const empezarContainer = document.querySelector('#empzarContainer')
const navContainer = document.querySelector('#botonesNav');

const btnAnterior = document.querySelector('#btnAnterior')
const btnSiguiente = document.querySelector('#btnSiguiente');

const mainHtml = document.querySelector('main');
const footerHTML = document.querySelector('footer');
const preguntasContainer = document.querySelector('.pregunta-container');

const indicadorProgreso = document.querySelector('#indicadorProgreso');

const respuestasContainer = document.querySelector('#respuestasContainer');
const puntajeFinal = document.querySelector('#puntaje');

const btnReiniciar = document.querySelector('#btnReiniciar');
const reiniciarContainer = document.querySelector('#reinicarContainer')

const btnModoEdit = document.querySelector('#btnEdit');
const adminContainer = document.querySelector('#adminContainer');
const listaPreguntasAdmin = document.querySelector('#listaPreguntasAdmin');
const formPregunta = document.querySelector('#formPregunta');
const editIndexInput = document.querySelector('#editIndex');

const inputPregunta = document.querySelector('#inputPregunta');
const op0 = document.querySelector('#opcion0');
const op1 = document.querySelector('#opcion1');
const op2 = document.querySelector('#opcion2');
const op3 = document.querySelector('#opcion3');
const selectCorrecta = document.querySelector('#selectCorrecta');
const btnCancelarEdit = document.querySelector('#btnCancelarEdit');

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
    navContainer.classList.remove('oculto');
    mainHtml.style.height = '80vh';
    empezarContainer.style.display = 'none'

    mostrarPreguntas();
});

btnSiguiente.addEventListener('click', () => {
    if (indicePregunta < preguntas.length - 1) {
        indicePregunta++;
        mostrarPreguntas();
    } else mostrarRespuestas();
});

btnAnterior.addEventListener('click', () => {
    if (indicePregunta > 0) {
        indicePregunta--;
        mostrarPreguntas();
    }
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

    //Cambios Navegación

    if (indicePregunta === preguntas.length - 1){
        btnSiguiente.textContent = 'Finalizar';
    } else {
        btnSiguiente.textContent = 'Siguiente';
    }

    if (indicePregunta === 0) btnAnterior.style.visibility = 'hidden'
    else btnAnterior.style.visibility = 'visible'

    //actualizar progreso
    actualizarIndicador();
};

const seleccionarRespuesta = (Evento) => {
    const opcionSelect = parseInt(Evento.target.dataset.index);
    const allBtns = document.querySelectorAll('.btn-opcion')

    respuestaUsuario[indicePregunta] = opcionSelect;

    allBtns.forEach(btn => btn.classList.remove('btn-select'));

    Evento.target.classList.add('btn-select');

};

const actualizarIndicador = () => {
    indicadorProgreso.innerHTML = '';

    preguntas.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        if(index === indicePregunta) dot.classList.add('dot-activo');

        indicadorProgreso.appendChild(dot);
    });
};

const mostrarRespuestas = () => {
    navContainer.style.display = 'none';
    mainHtml.style.height = '90vh';
    respuestasContainer.classList.remove('oculto');
    reiniciarContainer.classList.remove('oculto');
    preguntasContainer.innerHTML = '';
    respuestasContainer.innerHTML = '';

    respuestasContainer.appendChild(puntajeFinal);

    let puntajeCorrectas = 0;
    preguntas.forEach((preg, index) => {
        if (respuestaUsuario[index] === preg.correcta) puntajeCorrectas++;
    });

    puntajeFinal.textContent = `${puntajeCorrectas}/${preguntas.length}`;
    
    const resumenDiv = document.createElement('div');
    resumenDiv.classList.add('resumen-container');

    preguntas.forEach((preg, index) => {
        const itemResumen = document.createElement('div');
        itemResumen.classList.add('item-resumen');

        const userIndex = respuestaUsuario[index];
        const esCorrecta = userIndex === preg.correcta;

        if (esCorrecta) {
            itemResumen.classList.add('resumen-correcto');
            itemResumen.innerHTML = `<h3>${index + 1}. ${preg.pregunta}</h3>
            <p class="txt-acierto"> Respuesta: ${preg.opciones[userIndex]}</p>`;
        } else {
            itemResumen.classList.add('resumen-incorrecto');
            const textoUser = userIndex !== undefined && userIndex !== null
            ? preg.opciones[userIndex] : "Sin responder";
            itemResumen.innerHTML = `<h3>${index + 1}. ${preg.pregunta}</h3>
                <p class="txt-error"> Tu respuesta: ${textoUser}</p>
                <p class="txt-correcta"> Respuesta correcta: ${preg.opciones[preg.correcta]}</p>`;
                
        }

        resumenDiv.appendChild(itemResumen);

        
    });
    btnReiniciar.addEventListener('click', (reiniciarQuiz));
    respuestasContainer.appendChild(resumenDiv);
};

const reiniciarQuiz = () => {
    indicePregunta = 0;
    respuestaUsuario = [];
    navContainer.style.display = 'flex';
    preguntasContainer.classList.remove('oculto');
    empezarContainer.classList.add('oculto');
    mainHtml.style.height = '80vh';
    navContainer.classList.remove('oculto');
    respuestasContainer.classList.add('oculto')
    reiniciarContainer.classList.add('oculto')
    mostrarPreguntas();
}

btnEdit.addEventListener('click', () => {
    if (adminContainer.classList.contains('oculto')) {
        adminContainer.classList.remove('oculto');
        preguntasContainer.classList.add('oculto');
        empezarContainer.classList.add('oculto');
        respuestasContainer.classList.add('oculto');
        navContainer.classList.add('oculto');
        reiniciarContainer.classList.add('oculto')
        mainHtml.style.height = '90vh';
        renderizarListaAdmin();
    } else {
        // Volver al Quiz
        adminContainer.classList.add('oculto');
        reiniciarQuiz();
        empezarContainer.classList.add('oculto');
        btnEmpezar.classList.remove('oculto');
    }
});

const renderizarListaAdmin = () => {
    listaPreguntasAdmin.innerHTML = '';
    
    preguntas.forEach((preg, idx) => {
        const card = document.createElement('div');
        card.classList.add('card-admin');
        card.innerHTML = `
            <span><strong>${idx + 1}.</strong> ${preg.pregunta}</span>
            <button onclick="cargarParaEditar(${idx})">Editar</button>
        `;
        listaPreguntasAdmin.appendChild(card);
    });
};

window.cargarParaEditar = (index) => {
    const preg = preguntas[index];
    editIndexInput.value = index;
    inputPregunta.value = preg.pregunta;
    op0.value = preg.opciones[0];
    op1.value = preg.opciones[1];
    op2.value = preg.opciones[2];
    op3.value = preg.opciones[3];
    selectCorrecta.value = preg.correcta;

    document.querySelector('#formTitulo').textContent = 'Editar Pregunta';
    btnCancelarEdit.classList.remove('oculto');
};

formPregunta.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const indexEdit = parseInt(editIndexInput.value);
    const nuevaPregunta = {
        pregunta: inputPregunta.value,
        opciones: [op0.value, op1.value, op2.value, op3.value],
        correcta: parseInt(selectCorrecta.value)
    };

    if (indexEdit === -1) {
        // Agregar nueva pregunta al array
        preguntas.push(nuevaPregunta);
    } else {
        // Actualizar pregunta existente
        preguntas[indexEdit] = nuevaPregunta;
    }

    limpiarFormulario();
    renderizarListaAdmin();
});

const limpiarFormulario = () => {
    formPregunta.reset();
    editIndexInput.value = -1;
    document.querySelector('#formTitulo').textContent = 'Agregar Nueva Pregunta';
    btnCancelarEdit.classList.add('oculto');
};

btnCancelarEdit.addEventListener('click', limpiarFormulario);
/* el programa "pensara" en un nro y en base al numero ingresado por el usuario, el programa te dira si es mayor o menor para acertar el numero */

//jugador---------
const Jugador = class {
    constructor(name, number, count, life, win, lose){
        this.nombre = name;
        this.numero = number;
        this.contRep = count;
        this.vida = life;
        this.gano = win;
        this.perdio = lose;
    }
    contador(cont){
        return this.contRep +=cont;
    }
    vidas(cont){
        return this.vida -= cont;
    }
    ganadas(cont) {this.gano += cont;}
    perdidas(cont) {this.perdio +=cont;}
}
//Funcion para guardarlo en el localStorage
const setLocalStorage = (clave, valor) => localStorage.setItem(clave, valor);
//Funcion para Obtener el localStorage
const getLocalStorage = (clave) => JSON.parse(localStorage.getItem(clave));
let jugadoresStorage = getLocalStorage("Jugadores");

//Inicializo array de numeros ingresados
const nrosIng = []; 
//Vidas por default
const lifeDefault = 5;
//Inicializo al jugador
const jugador1 = new Jugador("",1,1,lifeDefault,0,0);

//Quita vidas
function quitVidas (){
    jugador1.vidas(1);
    jugador1.perdidas(1);
    updatePlayer()
    fieldLife();
}

//Arma el DOM para las vidas
 const imgLifes = () => {
    let imgLife = document.createElement("img");
    imgLife.setAttribute("src","img/vida.png");
    imgLife.setAttribute("alt","Representa las vidas");
    imgLife.classList.add("card-vida");

    return imgLife;
 };

//Muestro por pantalla cantidad de vidas
const fieldLife = _ => {
    let cantLife = document.querySelector('#playerLife');
    cantLife.innerHTML='Cantidad de vidas: ';

    let cantWin = document.querySelector('#playerWin');
    cantWin.innerHTML=`Ganadas: ${jugador1.gano}`;

    let cantLose = document.querySelector('#playerLose');
    cantLose.innerHTML=`Perdidas: ${jugador1.perdio}`;

    if (jugador1.vida <= 0) {
        cantLife.innerHTML += 0;
    }else{
        for (let i = 0; i < jugador1.vida; i++) {
            cantLife.appendChild(imgLifes());
        };
    }
}

//Agrega jugador
function addNewPlayer() {
    if (jugadoresStorage != null) {
       jugadoresStorage.push(
           { 
               Nombre: jugador1.nombre
               , TotalVidas: jugador1.vida
               , Ganados: 0
               , Perdidos: 0
            });
       setLocalStorage("Jugadores", JSON.stringify(jugadoresStorage));
    }else{
        setLocalStorage("Jugadores", JSON.stringify([
            { 
                Nombre: jugador1.nombre
                , TotalVidas: lifeDefault
                , Ganados: 0
                , Perdidos: 0
            }]));
        jugadoresStorage = getLocalStorage("Jugadores");
    } 
}

//Busca jugador
function playerFind(playerName){
     if (jugadoresStorage != null) {
        const playerActive = jugadoresStorage.find(pn => pn.Nombre === playerName);

        if (playerActive != undefined) {
            jugador1.nombre = playerActive.Nombre;
            jugador1.vida = playerActive.TotalVidas;
            jugador1.gano = playerActive.Ganados;
            jugador1.perdio = playerActive.Perdidos;

            return true;
        }
    }
    return false;
}

//Actualiza datos jugador
function updatePlayer() {
    for (const jugador of jugadoresStorage) {
        if(jugador.Nombre === jugador1.nombre){ 
            jugador.TotalVidas = jugador1.vida;
            jugador.Perdidos = jugador1.perdio;
            jugador.Ganados = jugador1.gano;
            break;
        }
    }
    setLocalStorage("Jugadores", JSON.stringify(jugadoresStorage));
}

///BOT number--------
const Bot = class{
    constructor(random){
        this.nroRandom = random; 
    }
    pista(mayorMenor){
        return `Te dare una pista... el numero que estoy pensando es ${mayorMenor} al numero que elejiste '(${jugador1.numero})'`;
    }
}
//BOT inicializo constructor
let bot = new Bot(Math.floor(Math.random() * 10) + 1)
//-------------

//Reinicio el juego al terminar cada partida
const resetGame = () => {
    checkLife();
    fieldLife();
    nrosIng.length = 0; //limpio array
    jugador1.contRep = 1;
    bot = new Bot(Math.floor(Math.random() * 10) + 1);

    leyendaJugar.innerHTML="¡Adivina el numero que estoy pensando! Para eso ingresa un numero del 1 al 10.";
    txtNumero.textContent = "";
    txtNumero.focus();
}

function checkLife(){
    if (jugador1.vida <= 0) {
        jugador1.vida = lifeDefault;  //Le reinicio las vidas
        updatePlayer();
    }
}

//Reinicio el juego al finalizarlo
const resetPlay = () => {
    resetGame();
    checkLife();

    const ingresarDatos = document.querySelector(".ingresarDatos");
    ingresarDatos.style.display = "block";

    const ingresarNumero = document.querySelector(".ingresarNumero");
    ingresarNumero.style.display = "none";
    txtNumero.value ="";

    leyendaJugar.innerHTML="¿Estas listo para la aventura?";
    document.querySelector('#playerName').innerHTML = "";
    playerLife.innerHTML="";
    playerWin.innerHTML="";
    playerLose.innerHTML="";
    
    let finish = document.querySelector("#finish"); 
    finish.innerHTML ="Detalles al finalizar el juego..."; 

    txtNombre.focus();
}
//-------------

//GAME-Partida terminada----// Scripting--
const finishGame = (resultado, nrosIng) => {
    let finish = document.querySelector("#finish");

    const divCardHeader = document.createElement('div');
    const divCardHeaderP = document.createElement('spam');
    divCardHeader.classList.add("card-header");
    divCardHeaderP.classList.add("titulo","color");

    const divCardHeaderImg = document.createElement('img');
    divCardHeaderImg.setAttribute("src", "img/arrow.png");
    divCardHeaderImg.classList.add("img-arrow");

    const divCardbody = document.createElement("div");
    divCardbody.classList.add("card-body", "card-bodyResul");
    
    const pCardbody = document.createElement("p");
    pCardbody.classList.add("card-text","card-text-estilo","color");
    pCardbody.setAttribute("id","playerResul");
    pCardbody.innerHTML= `Estos son los numeros que ingresaste: <ul class="color"><li> ${nrosIng.join("</li><li>")}</li></ul>`;

    const pCardbodyResul = document.createElement("p");
    pCardbodyResul.classList.add("result");
    pCardbodyResul.innerHTML= `${resultado}`;

    const divCardFooter = document.createElement("div");
    divCardFooter.classList.add("card-footer","color");

    if (jugador1.vida <= 0) {
        divCardHeaderP.textContent = "Juego Finalizado";
        divCardFooter.textContent = "Gracias por participar";

        btnReset.textContent="Reiniciar";
        leyendaJugar.innerHTML="UPS! no tienes vidas. Para seguir jugando tienes que reiniciar el juego";
    }else{
        divCardHeaderP.textContent = "Partida terminada";
        leyendaJugar.innerHTML="Aun te quedan vidas. Ingresa otro numero para volver a jugar.";
        resetGame();
    
        divCardHeader.appendChild(divCardHeaderImg);
        divCardHeader.appendChild(divCardHeaderP);
        finish.appendChild(divCardHeader);
        finish.appendChild(divCardbody);
        divCardbody.appendChild(pCardbody);
        divCardbody.appendChild(pCardbodyResul);
        finish.appendChild(divCardFooter);

        $(".card-header").on("click", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $(this)   //El que fue clickeado
            .next()   //significa el siguiente hermano que encuentre
            .slideToggle(500)   //Osea si esta oculta lo muestra y viceversa
            // Selecciona todas las respuestas
            .siblings(".card-bodyResul") //Esto es para ocultar todos los hrmnos 
            .slideUp();       //que esten desplegados o abiertos

            // Imagen para la pregunta activa
            const img = $(this).children("img");    // con this estoy indicando el li --> y dentro de este busco una etiqueta img y lo guardo en la variable
            img.toggleClass("rotate");    //le agrego mi clase para que lo gire 90° al hacer click
            $("img").not(img).removeClass("rotate");    //Le quito la clase a todas las etiquetas img que no estoy haciendo click.
        });
    }
}

//Resultados del juego
const checkResul = (contador) =>{
    if (jugador1.vida > 0) {
        jugador1.ganadas(1);
        updatePlayer();
        fieldLife();

        switch (true) {
            case contador == 1: 
                return `GANASTE de primera excelente!!!!!`;
        
            case contador >1 && contador <=4:
                return `GANASTE!!! Esta bastante bien. En el intento ${contador}`;
        
            case contador >=5 && contador <=9:
                return `GANASTE!!!! aunque lo intentaste ${contador} veces. Vuelve a jugar para hacerlo mejor.`;
        
            case contador >= 10:
                return `GANASTE al fin!!!! Lo intentaste ${contador} veces. Si ya no ganabas no se que decirte!`;
        
            default:
                return `Algo salio mal! vuelve mas tarde...`;
        }
    } else {
        return `UPS! te quedaste sin vidas 
                    <img class="card-vida" src="img/vida.png" alt="Representa las vidas">
                    - El numero ganador era el <b>${bot.nroRandom}</b> - Vuelve a jugar...`;
    }
}

const game = () => {
    let nroUsuario = jugador1.numero;
    let mayorMenor;

    jugador1.numero = nroUsuario;
    nrosIng.push(nroUsuario);

    if (bot.nroRandom != nroUsuario && jugador1.vida > 0) {
        jugador1.contador(1);
        quitVidas();

        if (jugador1.vida > 0) {
            if (bot.nroRandom > nroUsuario) {
                mayorMenor = 'MAYOR';
            } else {
                mayorMenor = 'MENOR';
            }

            leyendaJugar.innerHTML=`¡Vaya! no lo pudiste descubrir. - ${bot.pista(mayorMenor)} - Ingresa otro numero del 1 al 10`;
        }else{
            finishGame(checkResul(jugador1.contRep),nrosIng);
        }
    }
    else{
        finishGame(checkResul(jugador1.contRep),nrosIng);
    }  
}

const start = _ => game();

//Empieza el juego
const initEmpezar = () => {
    fieldLife();
    if (jugador1.vida > 0) {
        //Ingresa numero el jugador
        jugador1.numero = txtNumero.value;
        txtNumero.value ="";

        //Valido que haya ingresado un numero
        if (jugador1.numero != "") {
            start();    
        } else {
            MsjAlert_err("warning", "Debes ingresar un numero para jugar");
        }    
    }else{
        btnReset.textContent ="Reiniciar"
        txtNumero.value ="";
        MsjAlert_err("warning", "UPS! no tienes vidas. Para seguir jugando tienes que reiniciar el juego");
        txtNumero.focus();
    }
}

const init = () => {
    //Nombre del jugador por pantalla
    if (txtNombre.value === "") {
        MsjAlert_err("error", "Debes ingresar un Nombre para jugar");
        return false;
    }
    txtNombre.value = txtNombre.value.toLowerCase(); //Lo manejo en minuscula 

    if (jugadoresStorage != null) {
        if (!playerFind(txtNombre.value))
        {
            jugador1.nombre = txtNombre.value;
            addNewPlayer();
        }
    } else {
        jugador1.nombre = txtNombre.value;
        addNewPlayer();
    }

    document.querySelector('#playerName').innerHTML = `Bienvenido ${jugador1.nombre.toLocaleUpperCase()}!!!`;

    const ingresarNumero = document.querySelector(".ingresarNumero");
    ingresarNumero.style.display = "block";

    const ingresarDatos = document.querySelector(".ingresarDatos");
    ingresarDatos.style.display = "none";

    fieldLife();

    if (jugador1.vida > 0) {
        leyendaJugar.innerHTML="¡Adivina el numero que estoy pensando! Para eso ingresa un numero del 1 al 10.";
    } else {
        leyendaJugar.innerHTML="UPS! no tienes vidas. Para seguir jugando tienes que reiniciar el juego";
        btnReset.textContent="Reiniciar";
    }

    bot = new Bot(Math.floor(Math.random() * 10) + 1);

    txtNumero.focus();
}
 

const btnNumero = document.querySelector("#btnNumero");
btnNumero.addEventListener("click", initEmpezar);
//Tambien se puede hacer de esta forma mas "larga"
$("#txtNumero").keypress(function(evt){
    KeyEvent(evt, initEmpezar)
});

btnJugar.addEventListener("click", init);
//Arrow function : shortcut
txtNombre.focus();
$("#txtNombre").on("keypress", (evt) => KeyEvent(evt, init));

function KeyEvent(evt, ejecutar) {
    if (evt.keyCode == 13) {
        evt.preventDefault();
        ejecutar();
       }
}

//Reinicio el juego o cambio de usuario
const LogOffReset = () => {
    const contenido = btnReset.textContent;

    if (contenido == "Cerrar Session") {
        resetPlay();
    } else {
        btnReset.textContent = "Cerrar Session";
        resetGame();
    }
}
btnReset.addEventListener("click", LogOffReset);

//Mensaje de alerta con sweetAlert
function MsjAlert_err(ico, msj){
    swal({
        icon: ico,
        title: 'Ups!',
        buttons: false,
        text: msj,
        className : "swal-modal" , 
        className : "swal-text",
        timer: 2000,
      });
}


//Peticion ajax
const baseURL = "miapi.json";
const loadingDiv = document.querySelector("#loading");
const usersSaveDiv = document.querySelector("#usersSave");

const showLoading = () => {
    loadingDiv.style.display = "block";
  };

const hideLoading = () => {
    loadingDiv.style.display = "none";
};

const clearResults = () => {
    usersSaveDiv.innerHTML = "";
  };

  const pedidoAjax = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", `${baseURL}`);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        mostrar(JSON.parse(xhr.response));
      }
    };

    xhr.send(null);
  };

  const pedidoJquery = () => {
    $.get(`${baseURL}`, (respuesta, estado) => {
      if (estado === "success") {
        mostrar(respuesta);
      }
    });
  };

const mostrar = (jsonObj) => {
    clearResults();
    showLoading();
    jsonObj.forEach((jsonItem) => {
        const {TotalVidas, Nombre, Ganados, Perdidos} = jsonItem;
        const empleadoDiv = document.createElement("div");
        const empleadoItem = `
            <div class="employee">
                <h2 class="result">${Nombre}</h2>
                <ul class="color" style="list-style:none;">
                    <li>Vidas: ${TotalVidas}</li>
                    <li>Ganados: ${Ganados}</li>
                    <li>Perdidos: ${Perdidos}</li>
                </ul>
            </div>
            `;
        empleadoDiv.innerHTML = empleadoItem;
        usersSaveDiv.insertAdjacentElement("beforeend", empleadoDiv);

        hideLoading();
    });
};

const btnJquery = $("#jqueryApi");
btnJquery.on("click", pedidoJquery);
//FIN Peticion ajax
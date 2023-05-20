const BotonJugar = document.getElementById("botonJugar");
const BotonSelect = document.getElementById("selectButton");
const SelectList = document.getElementById("selectOptions");
const PantallaMenu = document.getElementById("menuScreen");
const PantallaJuego = document.getElementById("gameScreen");
const TableroJuego = document.getElementById("tablero") 
let tablero
let ancho, alto, minas

function crearTablero(ancho, alto)
{
  // Crea el tablero con ancho y alto y lo rellena con ceros
  tablero = []
  tablero.length = alto
  for (let i = 0; i < alto; i++)
  {
    tablero[i] = []
    tablero[i].length = ancho
    for (let j = 0; j < ancho; j ++)
    {
      tablero[i][j] = 0      
    }
  }
}

// Recibe la posicion del primer click y crea las demas minas
function CrearMinas(x,y,minas){
  let min = 0
  // mientras sea menor al numero de minas
  while (min < minas) {
    let cx = parseInt(Math.random()*(ancho-1))
    let cy = parseInt(Math.random()*(alto-1))
    if (PosicionarMina(cx,cy)){
      min++
    }
  }
}

// Ubica la mina en x,y; si existe una retorna false
function PosicionarMina(x, y) {
  
  return true
}

// Detecta el inicio del juego

BotonJugar.addEventListener("click", (e)=>{
  switch (BotonSelect.dataset.dificultad) {
    case "facil":
      ancho = 9
      alto = 9
      minas = 10
      break;
      case "medio":
        ancho = 16
        alto = 16
        minas = 40
        break
        case "dificil":
          ancho = 30
          alto = 16
          minas = 99
      break;
  }
  crearTablero(ancho, alto, minas)
  
  PantallaJuego.classList.remove("hidden")
  PantallaJuego.classList.add("aparecer")
  PantallaMenu.classList.add("disolver")
  setTimeout(()=>{
    PantallaMenu.classList.add("hidden")
  },2000)
})

SelectList.addEventListener("click", (e)=>{
  BotonSelect.dataset.dificultad = e.target.dataset.value
  BotonSelect.textContent =  e.target.textContent
})

TableroJuego.addEventListener("click", (e)=>{
  celda = e.target
  if (celda.classList.contains("celda") && ! (celda.classList.contains("vista"))) {
    celda.classList.add("vista")
  }
})
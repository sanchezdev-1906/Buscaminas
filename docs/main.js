const BotonJugar = document.getElementById("botonJugar");
const BotonSelect = document.getElementById("selectButton");
const SelectList = document.getElementById("selectOptions");
const PantallaMenu = document.getElementById("menuScreen");
const PantallaJuego = document.getElementById("gameScreen");
const TableroJuego = document.getElementById("tablero") 
let tablero
let ancho, alto, minas
let inicioJuego = false
let celdaInicial = {
  x: undefined,
  y: undefined
}

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

// Genera una grilla blanca y posiciona los elementos en la pantalla

function generarGrid(){
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[i].length; j++) {
      let celda = document.createElement("div");
      if (i%2==0) {
        celda.setAttribute("data-color",j%2==0?"even":"odd")
      }
      else
      {
        celda.setAttribute("data-color",j%2==0?"odd":"even")
      }
      celda.dataset.number = "0";
      celda.classList.add("celda");
      fragment.append(celda);
    }
  }
  TableroJuego.append(fragment)
}

// Recibe la posicion del primer click y crea las demas minas
function CrearMinas(x,y,nMinas){
  let min = 0

  // mientras sea menor al numero de minas
  while (min < nMinas) {
    let cx = parseInt(Math.random()*(ancho-1))
    let cy = parseInt(Math.random()*(alto-1))
    if ((cx > x+1 || cx < x-1) && (cy > y+1 || cy < y-1)){      
      if (PosicionarMina(cx,cy)){
        min++
      }
    }
  }
  console.log(tablero);
}

// Ubica la mina en x,y; si existe una retorna false
function PosicionarMina(x, y) {
  if (tablero[y][x] != 9){
    tablero[y][x] = 9 
    for (let i = y-1; i <= y+1; i++) {
      for (let j = (x-1); j<= (x+1); j++){
        if ((x == i && y == j ) || (i >= tablero.length || i < 0) || (j >= tablero[0].length || j < 0)){
          continue
        }
        tablero[i][j] += 1
      }
    }
    return true
  }
  return false
}

// Asigna valores a las minas
function AgregarAtributos() {
  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[0].length; j++) {
      TableroJuego.children[i*tablero.length + j].dataset.number = tablero[i][j];
    }
  }
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
  TableroJuego.classList.add(BotonSelect.dataset.dificultad)
  crearTablero(ancho, alto)
  generarGrid();
  
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
  // TODO
  if (inicioJuego == false) {
    inicioJuego = true
    CrearMinas(2,3,20);
  }
  else
  {
    AgregarAtributos();
  }
})
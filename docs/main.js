let ancho, alto;
let tablero
let inicialX, inicialY

function crearTablero(width, height)
{
  tablero = []
  for (let i = 0; i < height; i++){
    tablero.push(new Uint8Array(width))
  }
  for (let i = 0; i < height; i++){
    for (let j = 0; j < width; j++){
    tablero[i][j] = 0
    }
  }
}


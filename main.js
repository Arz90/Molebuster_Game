const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");

let lastHole;
let timeUp = false;
let score = 0;

// número aleatorio
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// agujero aleatorio evitando repetir el último
function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  if (hole === lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

// Función para mostrar el topo y controlar el tiempo de visualización
function topo() {
  const time = randomTime(1000, 2000);
  const hole = randomHole(holes);

  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");

    if (!timeUp) {
      topo(); // Llamada para mostrar el próximo topo
    }
  }, time);
}

// Función para iniciar el juego
function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  topo();
  setTimeout(() => (timeUp = true), 15000); // Muestra topos aleatoriamente
}

// Función para golpear al topo (incrementa el marcador)
function shoot(e) {
  if (!e.isTrusted) return; // Evita trampas

  score++;
  this.classList.remove("up"); // Oculta el topo al hacer clic
  scoreBoard.textContent = score;
}

// Agregamos la funcionalidad de golpear al topo a cada agujero
moles.forEach((mole) => mole.addEventListener("click", shoot));

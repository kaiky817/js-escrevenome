//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diâmetro = 15;
let raio = diâmetro /2;

//velocidade da bolinha
let velocidadexBolinha = 4;
let velocidadeyBolinha = 4;

//variaveis da raquete
let xRaquete = 2;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 80;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeyOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas (600, 400);
  trilha.loop();
}

function draw() {
  background(0); 
    mostraBolinha();
   movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
   movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}
function mostraBolinha(){
   circle (xBolinha, yBolinha, diâmetro); 
}
function movimentaBolinha(){
   xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha; 
}

function verificaColisaoBorda(){
    if (xBolinha+ raio > width ||
     xBolinha - raio < 0){
  velocidadexBolinha *= -1;  
}
  if (yBolinha + raio > height ||
     yBolinha - raio <0){
    velocidadeyBolinha *= -1;
  } 
}
function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}
function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento
        && yBolinha - raio < yRaquete + raqueteAltura
        && yBolinha + raio > yRaquete) {
        velocidadexBolinha *= -1;
      raquetada.play();
    }
}
function verificaColisaoRaquete(x,y) { 
      colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadexBolinha *= -1;
      raquetada.play();
    }
}

function movimentaRaqueteOponente() {
if (keyIsDown("87")) {
        yRaqueteOponente -= 10;
    }
    if (keyIsDown("83")) {
        yRaqueteOponente += 10;
    }    
}
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(230, 110, 0);
  rect(128, 10, 46, 20);
  fill(255);
  text(meusPontos,150, 26);
  fill(230, 110, 0);
  rect(428, 10, 46, 20);
  fill(255);
  text(pontosOponente, 450, 26)
}
function marcaPonto(){
  if (xBolinha > 595){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 5){
    pontosOponente += 1;
    ponto.play();
  }
}

 velocidadeyOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeyOponente
// ===========================
// Banco de palavras com acentos corretos
// ===========================
const palavras = [
    "tecnologia", "inovação", "computador", "algoritmo",
    "interface", "firmware", "criptografia", "javascript",
    "python", "programação", "internet", "software",
    "hardware", "database", "segurança", "servidor",
    "navegador", "protocolo", "variavel", "funcao"
];

// Sorteia uma palavra aleatória do banco
const palavra = palavras[Math.floor(Math.random() * palavras.length)];

// Guarda referências dos elementos para não repetir getElementById
const display = document.getElementById("palavra-display");
const inputLetra = document.getElementById("letras");
const btnTentar = document.getElementById("btn-tentar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const mensagem = document.getElementById("mensagem");
const letrasErradasDiv = document.getElementById("letras-erradas");
const canvas = document.getElementById("forca");

let letrasUsadas = [];
let erros = 0;

// Controla se o jogo ainda está ativo — impede ações após fim
let jogoAtivo = true;

// ===========================
// Mostra a palavra na tela
// _ para letras não descobertas
// ===========================
function mostrarPalavra() {
    display.innerHTML = "";

    for (let letra of palavra) {
        const span = document.createElement("span");
        span.textContent = letrasUsadas.includes(letra) ? letra : "_";
        display.appendChild(span);
    }
}

// ===========================
// Processa a tentativa do jogador
// ===========================
function tentarLetra() {
    // Bloqueia qualquer ação se o jogo terminou
    if (!jogoAtivo) return;

    const letra = inputLetra.value.toLowerCase();
    inputLetra.value = "";

    // Valida entrada — deve ser uma letra não usada ainda
    if (!letra || letrasUsadas.includes(letra)) {
        if (letrasUsadas.includes(letra)) {
            mensagem.textContent = "Essa letra já foi tentada!";
        }
        return;
    }

    letrasUsadas.push(letra);

    // Verifica se a letra está na palavra
    if (!palavra.includes(letra)) {
        erros++;
    }

    mostrarPalavra();
    desenharForca(erros);

    // Atualiza letras erradas na tela
    letrasErradasDiv.textContent = "Letras erradas: " +
        letrasUsadas.filter(l => !palavra.includes(l)).join(" - ");

    // Verifica condição de vitória
    const ganhou = palavra.split("").every(l => letrasUsadas.includes(l));

    // Verifica condição de derrota — máximo 7 erros
    const perdeu = erros >= 7;

    if (ganhou) {
        mensagem.textContent = "Parabéns! Você ganhou! 🎉";
        encerrarJogo();
    }

    if (perdeu) {
        mensagem.textContent = "Você perdeu! A palavra era: " + palavra;
        encerrarJogo();
    }
}

// ===========================
// Encerra o jogo corretamente
// Bloqueia input, botão e mostra reiniciar
// ===========================
function encerrarJogo() {
    jogoAtivo = false;
    inputLetra.disabled = true;
    btnTentar.disabled = true;

    // Remove a classe hidden para mostrar o botão
    btnReiniciar.classList.remove("hidden");
}

// ===========================
// Desenha a forca no canvas
// Cada parte aparece a cada erro
// ===========================
function desenharForca(erros) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    // Estrutura da forca — sempre visível
    ctx.beginPath();
    ctx.moveTo(10, 210); ctx.lineTo(190, 210); // base
    ctx.moveTo(50, 210); ctx.lineTo(50, 10);   // poste
    ctx.moveTo(50, 10);  ctx.lineTo(130, 10);  // topo
    ctx.moveTo(130, 10); ctx.lineTo(130, 40);  // corda
    ctx.stroke();

    if (erros >= 1) { // cabeça
        ctx.beginPath();
        ctx.arc(130, 60, 20, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (erros >= 2) { // corpo
        ctx.beginPath();
        ctx.moveTo(130, 80); ctx.lineTo(130, 140);
        ctx.stroke();
    }
    if (erros >= 3) { // braço esquerdo
        ctx.beginPath();
        ctx.moveTo(130, 100); ctx.lineTo(100, 125);
        ctx.stroke();
    }
    if (erros >= 4) { // braço direito
        ctx.beginPath();
        ctx.moveTo(130, 100); ctx.lineTo(160, 125);
        ctx.stroke();
    }
    if (erros >= 5) { // perna esquerda
        ctx.beginPath();
        ctx.moveTo(130, 140); ctx.lineTo(100, 175);
        ctx.stroke();
    }
    if (erros >= 6) { // perna direita
        ctx.beginPath();
        ctx.moveTo(130, 140); ctx.lineTo(160, 175);
        ctx.stroke();
    }
}

// ===========================
// Inicializa o jogo
// ===========================
mostrarPalavra();
desenharForca(0);

// Enter também confirma a letra
inputLetra.addEventListener("keydown", function(e) {
    if (e.key === "Enter") tentarLetra();
});

btnTentar.addEventListener("click", tentarLetra);
const palavras = ["tecnologia","inovacao","computador","algoritmo","interface","firmware","criptografia","javascript","python","programacao"];

const palavra = palavras[Math.floor(Math.random() * palavras.length)];



let letrasUsadas = [];
let erros = 0;

function mostrarPalavra() {
    const display = document.getElementById("palavra-display");
    display.innerHTML = "";

    for (let letra of palavra) {
        const span = document.createElement("span");
        span.textContent = letrasUsadas.includes(letra) ? letra : "_";
        display.appendChild(span);
    }
}

function tentarLetra() {
    const input = document.getElementById("letras");
    const letra = input.value.toLowerCase();
    input.value = "";

    if (!letra || letrasUsadas.includes(letra)) return;

    letrasUsadas.push(letra);

    if (!palavra.includes(letra)) {
        erros++;
    }

    mostrarPalavra();

    desenharForca(erros);
    const letrasErradas = document.getElementById("letras erradas");
    letrasErradas.textContent = "letras erradas" + letrasUsadas.filter(l => !palavra.includes(l)).join(" ");
    const ganhou = palavra.split("").every(letra => letrasUsadas.includes(letra));
    const perdeu = erros >= 7;

    if (ganhou) {
        document.getElementById("mensagem").textContent = "Parabéns! Você ganhou! 🎉";
        document.getElementById("btn-reiniciar").style.display = "block";
    }

    if (perdeu) {
        document.getElementById("mensagem").textContent = "Você perdeu! A palavra era: " + palavra;
        document.getElementById("btn-reiniciar").style.display = "block";
    }
}

function desenharForca(erros) {
    const canvas = document.getElementById("Forca");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle ="white";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
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

mostrarPalavra();
desenharForca(0);

document.getElementById("letras").addEventListener("keydown", function(e) {
    if (e.key === "Enter") tentarLetra();
});
document.getElementById("botao de tentar").addEventListener("click", tentarLetra);
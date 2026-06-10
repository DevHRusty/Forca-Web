const palavra = ["tecnologia","inovacao","computador","algoritimo","interface","firmware","criptografia","javascript","python","programacao"];

const palavra = palavra[Math.floor(Math.random() * palavra.length)];

let letrasUsadas = [];
let erros = 0;

console.log(palavra);
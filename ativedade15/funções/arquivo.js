// Parte Prática – Exercícios
// Todos os exercícios devem ser resolvidos com console.log.
// 1.	Crie uma função chamada bemVindo() que exiba a mensagem: 'Bem-vindo ao mundo das funções!'
function bemVindo() {
    console.log('Bem-vindo ao mundo das funções!');
}
// 2.	Crie uma função chamada quadrado(numero) que receba um número e exiba o quadrado dele.
function quadrado(numero) {
    console.log(numero * numero);
}
for (let H = 0; H < matriz.length; H++) {
    for (let I = 0; I < matriz[H].length; I++) {
        somaTotal += matriz[H][I];
    }
}
// 3.	Crie uma função chamada dobro(numero) que retorne o dobro de um número e exiba o resultado fora da função.
function dobro(numero) {
    return numero * 2;
}
console.log(dobro(5));
// 4.	Crie uma função chamada media(a, b, c) que receba três números e retorne a média deles.
function media(a, b, c) {
    return (a + b + c) / 3;
}
// 5.	Crie uma função chamada maiorNumero(a, b) que mostre qual dos dois números é maior.
function maiorNumero(a, b) {
    if (a > b) {
        console.log(a + " é maior que " + b);
    } else if (b > a) {
        console.log(b + " é maior que " + a);
    } else {
        console.log("Os dois números são iguais.");
    }
}
// 6.	Crie uma função chamada parOuImpar(numero) que exiba “Par” se o número for par, e “Ímpar” caso contrário.
function parOuImpar(numero) {
    if (numero % 2 === 0) {
        console.log("Par");
    } else {
        console.log("Ímpar");
    }
}
// 7.	Crie uma função chamada calcularDesconto(preco, percentual) que retorne o valor final com desconto aplicado.
function calcularDesconto(preco, percentual) {
    let desconto = (preco * percentual) / 100;
    return preco - desconto;
}
// 8.	Crie uma função chamada contagemRegressiva(inicio) que exiba no console uma contagem decrescente até 0.
function contagemRegressiva(inicio) {
    for (let i = inicio; i >= 0; i--) {
        console.log(i);
    }
}
// 9.	Crie uma função chamada tabuada(numero) que mostre no console a tabuada de 1 a 10 do número informado.
function tabuada(numero) {
    for (let i = 1; i <= 10; i++) {
        console.log(numero + " x " + i + " = " + (numero * i));
    }
}

// 10.	Crie uma função chamada verificaIdade(idade) que exiba “Menor de idade” ou “Maior de idade”.
function verificaIdade(idade) {
    if (idade < 18) {
        console.log("Menor de idade");
    } else {
        console.log("Maior de idade");
    }
}

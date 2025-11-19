// Atividade – Vetores e Matrizes em JavaScript
// Resolva os exercícios abaixo:

// Exercício 1
// Crie um vetor com 4 cores diferentes e mostre todas no console.
let cores = ["vermelho", "azul", "verde", "amarelo"];
for (let A = 0; A < cores.length; A++) {
    console.log(cores[A]);
}

// Exercício 2
// Crie um vetor com 6 números e mostre apenas os números pares.
let numeros = [1, 2, 3, 4, 5, 6];
for (let B = 0; B < numeros.length; B++) {
    if (numeros[B] % 2 === 0) {
        console.log(numeros[B]);
    }
}

// Exercício 3
// Crie um vetor com 5 números e mostre a soma total dos elementos.
let numeros2 = [1, 2, 3, 4, 5];
let soma = 0;
for (let C = 0; C < numeros2.length; C++) {
    soma += numeros2[C];
}
console.log(`A soma total é: ${soma}`);

// Exercício 4
// Crie um vetor com 5 números e mostre qual é o maior valor armazenado.
let numeros3 = [1, 2, 3, 4, 5];
let maior = numeros3[0];
for (let D = 1; D < numeros3.length; D++) {
    if (numeros3[D] > maior) {
        maior = numeros3[D];
    }
}
console.log(`O maior valor é: ${maior}`);

// Exercício 5
// Crie uma matriz 3x3 com números inteiros e mostre todos os elementos no console.
let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
for (let E = 0; E < matriz.length; E++) {
    for (let F = 0; F < matriz[E].length; F++) {
        console.log(matriz[E][F]);
    }
} 

// Exercício 6
// Usando a mesma matriz anterior, mostre apenas os números da diagonal principal.
for (let G = 0; G < matriz.length; G++) {
    console.log(matriz[G][G]);
}              

// Exercício 7
// Usando a matriz 3x3, calcule e mostre a soma de todos os valores.
let somaTotal = 0;
for (let H = 0; H < matriz.length; H++) {
    for (let I = 0; I < matriz[H].length; I++) {
        somaTotal += matriz[H][I];
    }
}
console.log(`A soma total é: ${somaTotal}`);

// Exercício 8
// Mostre a soma dos elementos de cada linha da matriz separadamente.
for (let J = 0; J < matriz.length; J++) {
    let somaLinha = 0;
    for (let K = 0; K < matriz[J].length; K++) {
        somaLinha += matriz[J][K];
    }
    console.log(`A soma da linha ${J} é: ${somaLinha}`);
}

// Exercício 9
// Crie um vetor com 3 nomes de alunos e uma matriz com 3 notas para cada um. Mostre o nome e a média de cada aluno.
let alunos = ["João", "Maria", "Pedro"];
let notasAlunos = [
    [7, 8, 9],
    [6, 5, 7],
    [10, 9, 8]
];
for (let L = 0; L < alunos.length; L++) {
    let somaNotas = 0;
    for (let M = 0; M < notasAlunos[L].length; M++) {
        somaNotas += notasAlunos[L][M];
    }
    let media = somaNotas / notasAlunos[L].length;
    console.log(`A média de ${alunos[L]} é: ${media}`);
}

// Exercício 10
// Crie uma matriz 3x3 com números aleatórios de 1 a 10 e mostre no console.
let matrizAleatoria = [];
for (let N = 0; N < 3; N++) {
    let linha = [];
    for (let O = 0; O < 3; O++) {
        linha.push(Math.floor(Math.random() * 10) + 1);
    }
    matrizAleatoria.push(linha);
}
for (let P = 0; P < matrizAleatoria.length; P++) {
    console.log(matrizAleatoria[P]);
}

// Desafio Extra
// Mostre todos os números maiores que 5 da matriz criada no exercício 10.
for (let Q = 0; Q < matrizAleatoria.length; Q++) {
    for (let R = 0; R < matrizAleatoria[Q].length; R++) {
        if (matrizAleatoria[Q][R] > 5) {
            console.log(matrizAleatoria[Q][R]);
        }
    }
}


// Crie uma variável chamada frase com o texto "O JavaScript é divertido" e mostre no console a quantidade de caracteres dessa frase, em seguida exiba apenas a palavra "divertido" utilizando o método slice.
let frase = "O JavaScript é divertido";
console.log(frase.length);
console.log(frase.slice(15));


// Declare uma variável nome contendo o seu próprio nome e mostre esse valor no console primeiro em letras maiúsculas com toUpperCase() e depois em letras minúsculas com toLowerCase().
let nome = "Lulu";
console.log(nome.toUpperCase());
console.log(nome.toLowerCase());



// Crie uma variável animal com o valor "O gato dorme muito" e substitua a palavra "gato" por "cachorro", exibindo o resultado final no console.
let gato = "o gato dorme muito";
console.log(gato.replace("gato", "cachorro"));



// Escreva um código que verifique se a palavra "JavaScript" está contida na frase "Estou aprendendo JavaScript" e, caso esteja, mostre no console "Achei a palavra!", caso contrário mostre "Não achei".
let frase2 = "Estou aprendendo JavaScript";
if (frase2.includes("JavaScript")) {
    console.log("Achei a palavra!");
} else {
    console.log("Não achei");
}


// Crie um programa que peça o nome de uma fruta armazenado em uma variável e utilize a estrutura switch para exibir mensagens diferentes para "maçã", "banana" e "uva", e para qualquer outra fruta mostre a mensagem "Fruta não cadastrada".
let fruta = "banana";
switch (fruta) {
    case "maçã":
        console.log("Essa é uma maçã.");
        break;
    case "banana":
        console.log("Essa é uma banana.");
        break;
    case "uva":
        console.log("Essa é uma uva.");
        break;
    default:
        console.log("Fruta não cadastrada.");
}


// Utilize um laço for para percorrer a string "Aprender" e exibir cada letra separadamente no console.
let palavra = "Aprender";
for (let i = 0; i < palavra.length; i++) {
    console.log(palavra[i]);
}



// Crie uma variável senhaCorreta com o valor "1234" e utilize um laço do...while que simule a digitação de senhas até acertar a senha correta, exibindo "Senha correta!" quando a senha informada for igual.
let senhaCorreta = "1234";
let senhaInformada;
do {
    senhaInformada = prompt("Digite a senha:");
}
while (senhaInformada !== senhaCorreta);
console.log("Senha correta!");


// Crie uma variável saldo com o valor 5 representando passagens de transporte e, enquanto o saldo for maior que zero, exiba no console "Usei 1 passagem. Restam X passagens", mostrando ao final "Saldo esgotado!".
let saldo = 5;
while (saldo > 0) {
    console.log(`Usei 1 passagem. Restam ${saldo - 1} passagens.`);
    saldo--;
}
console.log("Saldo esgotado!");


// Escreva um programa que armazene um número em uma variável e verifique se esse número é par ou ímpar, exibindo a mensagem "Número par" ou "Número ímpar" conforme o caso.
let numero = 10;
if (numero % 2 === 0) {
    console.log("Número par");
} else {
    console.log("Número ímpar");
}


// Crie uma variável texto com o valor "O rato roeu a roupa do rei de Roma" e utilize o método split(" ") para transformá-la em um array de palavras, em seguida percorra esse array com um laço for exibindo cada palavra em uma linha diferente no console.
let texto = "O rato roeu a roupa do rei de Roma";
let palavras = texto.split(" ");
for (let i = 0; i < palavras.length; i++) {
    console.log(palavras[i]);
}


// Crie um vetor com os nomes de cinco colegas da turma e exiba cada nome no console utilizando um laço for.
let colegas = ["Isa", "Maria", "Bruno", "Eduardo", "Carlos"];
for (let i = 0; i < colegas.length; i++) {
    console.log(colegas[i]);
}

// Crie um vetor com cinco números inteiros e calcule a soma de todos eles, mostrando o resultado final no console.
let numeros = [1, 2, 3, 4, 5];
let soma = 0;
for (let i = 0; i < numeros.length; i++) {
    soma += numeros[i];
}
console.log(`A soma dos números é: ${soma}`);

// Crie um vetor com alguns itens de supermercado (por exemplo: "arroz", "feijão", "leite") e utilize o método push() para adicionar dois novos itens, exibindo o vetor atualizado no console.
let supermercado = ["arroz", "feijão", "leite"];
supermercado.push("fruta", "verdura");
console.log(supermercado);

// Crie um vetor com os dias da semana e mostre no console apenas o dia correspondente à posição atual retornada pelo método getDay() do objeto Date.
let diasDaSemana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
let diaAtual = new Date().getDay();
console.log(`Hoje é ${diasDaSemana[diaAtual]}.`);

// Crie um vetor com cinco notas de alunos e utilize um laço para calcular a média. Ao final, exiba no console a média calculada.
let notas = [7, 8, 6, 9, 10];
let somaNotas = 0;
for (let i = 0; i < notas.length; i++) {
    somaNotas += notas[i];
}
let media = somaNotas / notas.length;
console.log(`A média das notas é: ${media}`);



// ATIVIDADE MATRIZ
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
let numeros2 = [1, 2, 3, 4, 5, 6];
for (let B = 0; B < numeros2.length; B++) {
    if (numeros2[B] % 2 === 0) {
        console.log(numeros2[B]);
    }
}

// Exercício 3
// Crie um vetor com 5 números e mostre a soma total dos elementos.


// Exercício 4
// Crie um vetor com 5 números e mostre qual é o maior valor armazenado.
// // Seu código aqui

// Exercício 5
// Crie uma matriz 3x3 com números inteiros e mostre todos os elementos no console.
// // Seu código aqui

// Exercício 6
// Usando a mesma matriz anterior, mostre apenas os números da diagonal principal.
// // Seu código aqui



// Exercício 7
// Usando a matriz 3x3, calcule e mostre a soma de todos os valores.
// // Seu código aqui

// Exercício 8
// Mostre a soma dos elementos de cada linha da matriz separadamente.
// // Seu código aqui

// Exercício 9
// Crie um vetor com 3 nomes de alunos e uma matriz com 3 notas para cada um. Mostre o nome e a média de cada aluno.
// // Seu código aqui

// Exercício 10
// Crie uma matriz 3x3 com números aleatórios de 1 a 10 e mostre no console.
// // Seu código aqui

// Desafio Extra
// Mostre todos os números maiores que 5 da matriz criada no exercício 10.
// // Seu código aqui


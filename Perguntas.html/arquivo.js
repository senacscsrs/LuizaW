// 1. Declare três variáveis: uma string com o seu nome, um number com a sua idade e um boolean que diga se você gosta de programação. Use console.log() para mostrar todas juntas.
let nome = "Luiza";
let idade = 15;
let gostaProgramacao = true;
console.log(nome, idade, gostaProgramacao);

// 2. Crie uma variável chamada fruta com valor "maçã". Em seguida, mude o valor dela para "banana" e imprima os dois momentos no console.
let fruta = "maçã";
console.log(fruta);
fruta = "banana";
console.log(fruta);

// 3. Mostre no console uma frase que use template string para exibir: "Meu nome é X e tenho Y anos".
console.log(`Meu nome é ${nome} e tenho ${idade} anos.`);

// 4. Declare uma variável cidade e outra estado. Mostre no console uma frase completa usando concatenação com +.
let cidade = "Santa Cruz Do Sul";
let estado = "RS";
console.log("Eu moro em " + cidade + ", " + estado + ".");

// 5. Repita o exercício anterior, mas agora usando template string.
console.log(`Eu moro em ${cidade}, ${estado}.`);

// 6. Use console.log() com vírgula para exibir três informações: "Produto:", o nome de um produto e o preço dele.
let produto = "Notebook";
let preco = 1999.99;
console.log("Produto:", produto, "Preço:", preco);

// 7. Crie uma variável que contenha uma quebra de linha usando \n e mostre no console.
let quebraDeLinha = "Primeira linha\nSegunda linha";
console.log(quebraDeLinha);
// 8. Crie uma variável que contenha um símbolo especial com \u00A9 e exiba no console.
let simboloEspecial = "\u00A9";
console.log(simboloEspecial);

// Exercícios sobre If / Else

// 9. Crie uma variável nota com valor numérico. Se for maior ou igual a 7, mostre "Aprovado". Senão, mostre "Reprovado".
let nota = 8;
if (nota >= 7) {
    console.log("Aprovado");
} else {
    console.log("Reprovado");
}
// 10. Declare uma variável idade. Se for maior ou igual a 18, mostre "Maior de idade". Caso contrário, mostre "Menor de idade".
if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// 11. Crie uma variável senha. Se ela for igual a "1234", mostre "Acesso permitido", caso contrário mostre "Senha incorreta".
let senha = "1234";
if (senha === "1234") {
    console.log("Acesso permitido");
} else {
    console.log("Senha incorreta");
}

// 12. Declare uma variável numero. Se for positivo, mostre "Número positivo". Se for negativo, mostre "Número negativo". Se for 0, mostre "Número neutro".
let numero = 0;
if (numero > 0) {
    console.log("Número positivo");
} else if (numero < 0) {
    console.log("Número negativo");
} else {
    console.log("Número neutro");
}

// 13. Crie duas variáveis num1 e num2. Use if/else para verificar qual é o maior e mostre o resultado no console.
let num1 = 5;
let num2 = 10;
if (num1 > num2) {
    console.log("Num1 é maior");
} else if (num1 < num2) {
    console.log("Num2 é maior");
} else {
    console.log("Os dois são iguais");
}

// Exercícios sobre Switch

// 14. Crie uma variável diaSemana com um número de 1 a 7 e use switch para mostrar qual é o dia correspondente.
let diaSemana = 5;
switch (diaSemana) {
    case 1:
        console.log("Domingo");
        break;
    case 2:
        console.log("Segunda-feira");
        break;
    case 3:
        console.log("Terça-feira");
        break;
    case 4:
        console.log("Quarta-feira");
        break;
    case 5:
        console.log("Quinta-feira");
        break;
    case 6:
        console.log("Sexta-feira");
        break;
    case 7:
        console.log("Sábado");
        break;
    default:
        console.log("Dia inválido");
}

// 15. Use switch para verificar a cor de um semáforo ("vermelho", "amarelo", "verde") e mostre no console a ação correspondente.
let corSemaforo = "verde";
switch (corSemaforo) {
    case "vermelho":
        console.log("Pare");
        break;
    case "amarelo":
        console.log("Atenção");
        break;
    case "verde":
        console.log("Siga");
        break;
    default:
        console.log("Cor inválida");
}

// 16. Crie uma variável notaConceito que pode ser "A", "B", "C", "D" ou "F". Use switch para mostrar a mensagem correspondente à nota.
let notaConceito = "A";
switch (notaConceito) {
    case "A":
        console.log("Excelente");
        break;
    case "B":
        console.log("Bom");
        break;
    case "C":
        console.log("Regular");
        break;
    case "D":
        console.log("Ruim");
        break;
    case "F":
        console.log("Reprovado");
        break;
    default:
        console.log("Nota inválida");
}

// 17. Declare uma variável mes com número de 1 a 12 e use switch para mostrar o nome do mês.
let mes = 5;
switch (mes) {
    case 1:
        console.log("Janeiro");
        break;
    case 2:
        console.log("Fevereiro");
        break;
    case 3:
        console.log("Março");
        break;
    case 4:
        console.log("Abril");
        break;
    case 5:
        console.log("Maio");
        break;
    case 6:
        console.log("Junho");
        break;
    case 7:
        console.log("Julho");
        break;
    case 8:
        console.log("Agosto");
        break;
    case 9:
        console.log("Setembro");
        break;
    case 10:
        console.log("Outubro");
        break;
    case 11:
        console.log("Novembro");
        break;
    case 12:
        console.log("Dezembro");
        break;
    default:
        console.log("Mês inválido");
}


// Exercícios sobre For

// 18. Use um for para imprimir os números de 1 a 10 no console.
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

// 19. Monte um for que faça uma contagem regressiva de 10 até 0 e ao final mostre "Fogo!".
for (let i = 10; i >= 0; i--) {
    console.log(i);
}
console.log("Fogo!");

// 20. Crie um for que multiplique um número qualquer de 1 até 10 e mostre a tabuada no console.
let num = 5;
for (let i = 1; i <= 10; i++) {
    console.log(`${num} x ${i} = ${num * i}`);
}

// 21. Use um for para imprimir apenas os números pares de 0 até 20.
for (let i = 0; i <= 20; i += 2) {
    console.log(i);
}

// 22. Use um for para somar todos os números de 1 a 100 e mostre o resultado no console.
let soma = 0;
for (let i = 1; i <= 100; i++) {
    soma += i;
}
console.log(soma);


// Exercícios sobre While

// 23. Crie uma variável contador iniciando em 0 e use while para imprimir os números até 5.
let contador = 0;
while (contador <= 5) {
    console.log(contador);
    contador++;
}

// 24. Simule um caixa eletrônico: comece com saldo = 100 e enquanto o saldo for maior que 0, retire 10 e mostre no console.
let saldo = 100;
while (saldo > 0) {
    saldo -= 10;
    console.log(`Saldo: ${saldo}`);
}

// 25. Use while para mostrar todos os números ímpares entre 1 e 20.
let i = 1;
while (i < 20) {
    console.log(i);
    i += 2;
}

// 26. Crie uma variável senha e simule uma tentativa de senha com while, até que a senha correta "abcd" seja digitada.
let tentativa = "";
while (tentativa !== "abcd") {
    tentativa = "abcd"; // Simulando a entrada correta
}
console.log("Senha correta!");


// Exercícios sobre Do/While

// 27. Peça uma senha (simulada com uma variável) e use do/while para repetir até que ela seja "1234".
let senha1 = "";
do {
    senha1 = "1234"; // Simulando a entrada correta
} while (senha1 !== "1234");
console.log("Senha correta!");

// 28. Use do/while para imprimir números de 0 a 3.

// 29. Crie um do/while que mostre um menu com três opções (simulado com uma variável) e só saia quando a opção for "sair".

// 30. Use do/while para gerar números de 1 até 5 e mostrá-los no console.

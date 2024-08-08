function dividir(numero1: number, numero2: number) {
    if (numero2 === 0) {
        throw Error("Número 2 não pode ser 0");
    }
    return numero1 / numero2;
}

function exemploTratamentoExcecao01() {
    try {
        console.log(dividir(32, 0));
        console.log("Deu boa");
    } catch (error) {
        console.log(error.message);
    }

    console.log("Acabou a execução");
}

function calcularImc(peso: number, altura: number): number {
    if (peso <= 0) {
        throw Error("Peso inválido! Valor não pode ser zero ou negativo.");
    }

    if(peso >= 400)
        throw Error("Peso inválido! Valor não pode ser maior que 399");

    if(altura <= 0)
        throw Error("Altura inválida! Valor não pode ser menor ou igual a zero");
    
    if (altura >= 2.60)
        throw Error("Altura inválida! Valor não pode ser acima de 2.60");

    let imc = peso / (altura * altura);
    return imc;
}

try {
    console.log(calcularImc(570, 1.63));
} catch (error) {
    console.log(error.message);
}
console.log("Obrigado");
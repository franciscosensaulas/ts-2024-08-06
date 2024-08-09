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

    if (peso >= 400)
        throw Error("Peso inválido! Valor não pode ser maior que 399");

    if (altura <= 0)
        throw Error("Altura inválida! Valor não pode ser menor ou igual a zero");

    if (altura >= 2.60)
        throw Error("Altura inválida! Valor não pode ser acima de 2.60");

    let imc = peso / (altura * altura);
    return imc;
}

function exemploTratamentoExcecao02() {
    try {
        console.log(calcularImc(570, 1.63));
    } catch (error) {
        console.log(error.message);
    }
    console.log("Obrigado");
}


class AnoNascimentoAbaixoDoMinimoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "AnoNascimentoAbaixoDoMinimoError";
    }
}

class AnoNascimentoAcimaDoMaximoError extends Error {
    constructor(ano_maximo: number) {
        super(`Ano Nascimento inválido! Valor deve ser abaixo de ${ano_maximo}`);
        this.name = "AnoNascimentoAcimaDoMaximoError";
    }
}

function calcularIdade(anoNascimento: number): number {
    if (anoNascimento < 1900) {
        throw new AnoNascimentoAbaixoDoMinimoError("Ano Nascimento inválido! Valor deve ser acima de 1899");
    }

    let dataAtual: Date = new Date();
    let anoAtual: number = dataAtual.getFullYear();
    if (anoNascimento > anoAtual) {
        throw new AnoNascimentoAcimaDoMaximoError(anoAtual + 1);
    }
    let idade = anoAtual - anoNascimento;
    return idade;
}

try {
    let idade = calcularIdade(1030);
    console.log(`Idade: ${idade}`);
} catch (error) {
    if (error instanceof AnoNascimentoAbaixoDoMinimoError || error instanceof AnoNascimentoAcimaDoMaximoError) {
        console.log("Erro no campo de Ano de Nascimento:");
        console.error(error.message);
        console.error(error.name);
        console.error(error.stack);
    } else {
        console.log(error.message);
    }
}

/*
Ex1.: Criar um método chamado calcularIdade que calcula a idade de uma pessoa, que 
        recebe o parâmetro do ano de nascimento. 
        O método deverá retornar a idade calculada
        Este método deve validar os seguintes itens:
        - Ano de nascimento deve ser entre 1900 até 2024, caso não for dentro deste range deverá lançar erros
Ex2.: Criar um método que calcule o salário bruto:
    Parâmetros:
        - valor hora
        - quantidade de horas
    Validações: 
        - valor hora não pode ser negativo ou zero
        - valor hora não pode ultrapassar o valor de R$ 350,99
        - quantidade de horas não pode ser negativo ou zero
        - quantidade de horas não pode ultrapassar 440 horas

        Estrutura de dados
        
*/
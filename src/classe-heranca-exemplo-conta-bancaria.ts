/* classe-heranca-exemplo-conta-bancaria.ts */
class ContaBancaria {
    /*
    Encapsulamento:
    - public: é possível acessar métodos, propriedades em qualquer lugar, em classes filhas ou em objetos
    - protected: é possível acessar métodos, propriedades na própria classe ou classes filhas
    - private:  é possível acessar métodos, propriedades na própria classe.
    */
    protected numeroConta: string;
    protected saldo: number;
    protected cliente: string;

    constructor(numeroConta: string, cliente: string) {
        this.numeroConta = numeroConta;
        this.cliente = cliente;
        this.saldo = 0;
    }

    public depositar(valor: number): void {
        if (valor <= 0) {
            console.log("ERRO: Depósito não realizado, valor de depósito deve ser positivo.");
            return;
        }
        console.log(`Depositado: R$ ${valor}. Saldo anterior: R$ ${this.saldo}. Saldo atual: R$ ${this.saldo + valor}`);
        this.saldo += valor;
    }

    public sacar(valor: number): void {
        if (this.validarValorNegativoSaque(valor) === false)
            return;

        if (valor > this.saldo) {
            console.log("ERRO: Saque não realizado, pois o saldo é insuficiente");
            return;
        }

        console.log(`Saque: R$ ${valor}. Saldo anterior: R$ ${this.saldo}. Saldo atual: R$ ${this.saldo - valor}`);
        this.saldo -= valor;
    }

    protected validarValorNegativoSaque(valor: number): boolean {
        if (valor <= 0) {
            console.log("ERRO: Saque não realizado, pois valor de saque deve ser positivo.");
            return false;
        }
        return true;
    }

    public obterNomeCliente() {
        return this.cliente;
    }

    public apresentarDados(): void {
        console.log(
            "Cliente: " + this.cliente +
            "\nSaldo: R$ " + this.saldo.toFixed(2));
    }
}



// V e V => V
// V e F => F
// F e V => F
// F e F => F
class ContaCorrente extends ContaBancaria {
    private chequeEspecial: number;

    constructor(numeroConta: string, nome: string, sobrenome: string, score: number) {
        super(numeroConta, nome);
        // Atualizando o nome do cliente com o nome completo (nome + sobrenome)
        this.cliente = `${nome} ${sobrenome}`;
        this.chequeEspecial = this.calcularChequeEspecial(score);
    }

    /*
    ✔ 000 .. 150 => 0
    ✔ 151 .. 300 => 100
    ✔ 301 .. 500 => 500
    ✔ 501 .. 750 => 2500
    ✔ 750 .. 900 => 5000
    ✔ 900 .. 950 => 10000
    ✔ 950 .. => ao infinito
    */
    private calcularChequeEspecial(score: number): number {
        if (score >= 0 && score <= 150)
            return 0;
        else if (score <= 300)
            return 100;
        else if (score <= 500)
            return 500;
        else if (score <= 750)
            return 2500;
        else if (score <= 900)
            return 5000;
        else if (score <= 950)
            return 10000;
        else
            return Number.MAX_SAFE_INTEGER;
    }

    // Sobreescrevendo o comportamento do método da classe pai, ou seja, adicionando o próprio comportamento 
    public override apresentarDados(): void {
        // Chamando o apresentarDados da classe pai(ContaCorrente)
        super.apresentarDados();
        // Adicionando o comportamento diferente da classe filha
        console.log("Cheque Especial: " + this.chequeEspecial);
    }

    public override sacar(valor: number): void {
        if (super.validarValorNegativoSaque(valor) === false)
            return;

        if (valor > this.saldo + this.chequeEspecial) {
            console.log("ERRO: Saque não realizado, pois o saldo + limite é insuficiente");
            return;
        }

        console.log(`Saque: R$ ${valor}. Saldo anterior: R$ ${this.saldo}. Saldo atual: R$ ${this.saldo - valor}`);
        this.saldo -= valor;
    }
}

class ContaPoupanca extends ContaBancaria {
    private taxaJuros: number;

    constructor(numero: string, cliente: string, taxaJuros: number) {
        super(numero, cliente);

        this.taxaJuros = taxaJuros;
    }

    public aplicarJuros(): void {
        // Calcular a taxa de juros, pois o usuário informa 7,28 e para calcularmos o valor é necessário
        // transformar em 0,0728
        let taxaJuros = this.taxaJuros / 100;
        // Calcular o valor do juros que receberá
        let juros = this.saldo * taxaJuros;
        // Atualizar o saldo com o juros
        this.saldo += juros;
    }

    // Sobreescrevendo o comportamento do método da classe pai, ou seja, adicionando o próprio comportamento 
    public override apresentarDados(): void {
        // Chamando o apresentarDados da classe pai(ContaCorrente)
        super.apresentarDados();
        // Adicionando o comportamento diferente da classe filha
        console.log("Taxa de juros: " + this.taxaJuros);
    }
}
// saldo 
// 9750,20      100
//              7.28 taxa de Juros
// Valor do juros => (9750,20 * 7,28) / 100 => 709,81
// Valor do juros (simplificado) => 9750,20 * 0,0728
// Valor do juros + saldo => (9750,20 * 7,28) / 100 => 709,81 + 9750,20 => 10460,01
// Valor do juros + saldo (simplificado) => 9750,20 * 1,0728 => 10460,01
let contaPoupanca = new ContaPoupanca("A99", "Pedrinho", 7.28);
contaPoupanca.depositar(9750.20);
contaPoupanca.apresentarDados();

contaPoupanca.aplicarJuros();
contaPoupanca.apresentarDados();

let score = 300;
let contaCorrente = new ContaCorrente("1239", "Manuer", "Logan", score);
contaCorrente.sacar(98);
contaCorrente.apresentarDados();

let conta = new ContaBancaria("1A", "Pedro");
conta.depositar(100);
conta.depositar(250);
conta.depositar(-10);
conta.sacar(300);
conta.sacar(-10);
conta.sacar(100);
conta.apresentarDados();

/*
https://dontpad.com/franciscosensaulas/ts
Ex. 1: 
    Crie uma classe base chamada InstrumentoMusical com as propriedades nome e tipo (por exemplo, "cordas", "sopro", etc.). Adicione um método tocar() que retorne uma string genérica como "Tocando instrumento". 
    
    Crie duas subclasses chamadas Violao e Flauta, que herdem de InstrumentoMusical. 

    Na classe Violao, adicione uma propriedade numeroCordas e sobrescreva o método tocar() para retornar uma string como "Tocando violão com 6 cordas". 

    Na classe Flauta, adicione uma propriedade material e sobrescreva o método tocar() para retornar uma string como "Tocando flauta feita de [material]".
Ex. 2: 
    Crie uma classe base chamada Transporte com as propriedades tipo, velocidadeMaxima, e capacidadePassageiros. Adicione um método informacoes() que retorne uma string com as informações básicas do transporte. 

    Crie duas subclasses chamadas Carro e Avião. 

    Na classe Carro, adicione uma propriedade numeroPortas e crie um método específico abrirPortas() que retorne uma string informando o número de portas abertas. 

    Na classe Avião, adicione uma propriedade alcanceVoo (em quilômetros) e um método específico mostrarAlcance() que retorne uma string com o alcance de voo. 

    As subclasses devem sobrescrever o método informacoes() para incluir os detalhes específicos de cada tipo de transporte.
*/

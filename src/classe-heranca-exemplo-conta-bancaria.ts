/* classe-heranca-exemplo-conta-bancaria.ts */
class ContaBancaria {
    private numeroConta: string;
    private saldo: number;
    private cliente: string;

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
        if (valor <= 0){
            console.log("ERRO: Saque não realizado, pois valor de saque deve ser positivo.");
            return;
        }
        if(valor > this.saldo){
            console.log("ERRO: Saque não realizado, pois o saldo é insuficiente");
            return;
        }

        console.log(`Saque: R$ ${valor}. Saldo anterior: R$ ${this.saldo}. Saldo atual: R$ ${this.saldo - valor}`);
        this.saldo -= valor;
    }

    public obterNomeCliente() {
        return this.cliente;
    }

    public apresentarDados() {
        console.log("Cliente: " + this.cliente + " Saldo: R$ " + this.saldo);
    }
}

let conta = new ContaBancaria("1A", "Pedro");
conta.depositar(100);
conta.depositar(250);
conta.depositar(-10);
conta.sacar(300);
conta.sacar(-10);
conta.sacar(100);
conta.apresentarDados();

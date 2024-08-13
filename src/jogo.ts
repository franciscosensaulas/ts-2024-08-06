class Player {
    private vida: number;
    private nome: string;
    private stamina: number;

    constructor(nome: string) {
        this.nome = nome;
        this.vida = 100;
        this.stamina = 50;
    }

    peteleco(player: Player): string {
        if (this.estaDormindo() || player.estaDormindo())
            return;
        let vidaAtual = player.vida;
        this.realizarAtaque(this, player, 10, 10);
        this.fatality(player);
        return `${this.nome} Ataque peteleco no ${player.nome}`;
    }

    mordida(player: Player): string {
        if (this.estaDormindo() || player.estaDormindo())
            return;
        let vidaAtual = player.vida;
        this.realizarAtaque(this, player, 5, 0);
        this.fatality(player);
        return `${this.nome} Ataque mordida no ${player.nome}`;
    }

    estaDormindo() {
        return this.vida <= 0;
    }

    tapa(player: Player): string {
        if (this.estaDormindo() || player.estaDormindo())
            return;

        let vidaAtual = player.vida;
        this.realizarAtaque(this, player, 20, 15);
        this.fatality(player);
        return `${this.nome} Ataque tapa no ${player.nome}`;
    }

    soco(player: Player): string {
        if (this.estaDormindo() || player.estaDormindo())
            return;
        let vidaAtual = player.vida;
        this.realizarAtaque(this, player, 50, 35);
        this.fatality(player);
        return `${this.nome} Ataque soco no ${player.nome}`;
    }

    fatality(atacado: Player) {
        if (atacado.vida <= 0) {
            console.log(`${this.nome} ganhou`);
        }
    }

    realizarAtaque(atacante: Player, atacado: Player, dano: number, consumoStamina: number) {
        if (atacado.stamina <= 0) {
            atacado.vida -= dano * 2;
        } else {
            atacado.vida -= dano;
        }
        atacante.stamina -= consumoStamina;
    }

    // jorge.pedirDesculpa(matheus)
    pedirDesculpa(player: Player): string {
        this.stamina += 5;
        return `${this.nome} pediu desculpas, restaurando +5 stamina (${this.stamina})`;

    }

    informacoes() {
        return `Nome: ${this.nome}\nVida: ${this.vida}\nStamina: ${this.stamina}`;
    }

    obterVida(): number {
        return this.vida;
    }

    obterStamina(): number {
        return this.stamina;
    }
}


function exemplo() {
    let jorge = new Player("Jorge");
    let matheus = new Player("Matheus");
    jorge.peteleco(matheus);
    matheus.soco(jorge);
    jorge.peteleco(matheus);
    matheus.tapa(jorge);
    jorge.tapa(matheus);
    matheus.mordida(jorge);
    matheus.mordida(jorge);
    matheus.pedirDesculpa(jorge);
    matheus.pedirDesculpa(jorge);
    matheus.pedirDesculpa(jorge);
    matheus.pedirDesculpa(jorge);
    matheus.tapa(jorge);
    jorge.tapa(matheus);
    console.log(jorge.informacoes());
    console.log(matheus.informacoes());
}


let jorge = new Player("Jorge");
let matheus = new Player("Matheus");

function petelecoClick(event: any) {
    realizarAtaque(event, petelecoAcao);
}

function petelecoAcao(atacante: Player, atacado: Player) {
    return atacante.peteleco(atacado);
}

function tapaClick(event: any) {
    realizarAtaque(event, tapaAcao);
}

function tapaAcao(atacante: Player, atacado: Player) {
    return atacante.tapa(atacado);
}

function socoClick(event: any) {
    realizarAtaque(event, socoAcao);
}

function socoAcao(atacante: Player, atacado: Player) {
    return atacante.soco(atacado);
}

function mordidaClick(event: any) {
    realizarAtaque(event, mordidaAcao);
}

function mordidaAcao(atacante: Player, atacado: Player) {
    return atacante.mordida(atacado);
}

function desculpaClick(event: any) {
    realizarAtaque(event, desculpaAcao);
}

function desculpaAcao(atacante: Player, atacado: Player) {
    return atacante.pedirDesculpa(atacado);
}

function realizarAtaque(event: any, func: any) {
    let divPai = event.target.parentNode.parentNode;
    let nomeAtacante = divPai.getAttribute("data-id");

    let atacante: Player, atacado: Player;
    let nomeAtacado: string;
    if (nomeAtacante === "jorge") {
        atacante = jorge;
        atacado = matheus;
        nomeAtacado = "matheus";
    }
    else {
        atacante = matheus;
        atacado = jorge;
        nomeAtacado = "jorge";
    }

    let mensagem = func(atacante, atacado);

    let spanStaminaAtacante = divPai.querySelector(".stamina-valor");
    spanStaminaAtacante.innerText = atacante.obterStamina();

    let divAtacado = divPai.parentNode.querySelector(`[data-id="${nomeAtacado}"]`);
    let spanVidaAtacado = divAtacado.querySelector(".vida-valor");
    spanVidaAtacado.innerText = atacado.obterVida();

    let historico = document.querySelector(".historico");
    let li = document.createElement("li");
    li.innerText = mensagem;
    historico.appendChild(li)
}

const acoes = new Map<string, any>();
acoes.set("btn-peteleco", petelecoClick);
acoes.set("btn-tapa", tapaClick);
acoes.set("btn-soco", socoClick);
acoes.set("btn-mordida", mordidaClick);
acoes.set("btn-desculpa", desculpaClick);

acoes.forEach((valor, chave) => {
    Array.from(document.getElementsByClassName(chave)).forEach(botao => {
        botao.addEventListener("click", valor);
    })
})

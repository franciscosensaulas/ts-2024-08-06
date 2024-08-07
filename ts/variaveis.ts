/*
Método exemplo01 é um método sem retorno (void)
*/
function exemplo01(): void {
    let nomeUsuario: string = "Bruce Wayne";
    let apelido: string = "Batman";
    let idade: number = 59;
    let patrimonio: number = 9999999.99;
    let estaEmpregado: boolean = true;
    let filhoMarta: boolean = false;

    // Atualizando o estado de empregado do Robin
    estaEmpregado = true;

    let estaEmpregadoTexto = convertBooleanParaString(estaEmpregado);

    let titulo = document.querySelector("h1");
    titulo.innerText = nomeUsuario;

    let paragrafo = document.querySelector("p");
    paragrafo.innerText = `
Apelido: ${apelido}
Idade: ${idade}
Patrimônio: ${patrimonio}
Empregado: ${estaEmpregadoTexto}
Filho Marta: ${convertBooleanParaString(filhoMarta)}`;
}

function convertBooleanParaString(valor: boolean): string {
    if (valor) {
        return "Sim";
    }
    return "Não";
}

// function convertBooleanParaString(valor: boolean): string {
//     let retorno: string;
//     // if (valor === true) {
//     if (valor) {
//         retorno = "Sim";
//     } else {
//         retorno = "Não";
//     }
//     return retorno;
// }

// function convertBooleanParaString(valor: boolean): string {
//     if (valor) 
//         return "Sim";
//     return "Não";
// }
// function convertBooleanParaString(valor: boolean): string {
//     // Operador ternário
//     // return if ? código do if : código do else
//     return valor ? "Sim"  : "Não";
// }

exemplo01();
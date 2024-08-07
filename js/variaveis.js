function exemplo01() {
    var nomeUsuario = "Bruce Wayne";
    var apelido = "Batman";
    var idade = 59;
    var patrimonio = 9999999.99;
    var estaEmpregado = true;
    var filhoMarta = false;
    estaEmpregado = true;
    var estaEmpregadoTexto = convertBooleanParaString(estaEmpregado);
    var titulo = document.querySelector("h1");
    titulo.innerText = nomeUsuario;
    var paragrafo = document.querySelector("p");
    paragrafo.innerText = "\nApelido: ".concat(apelido, "\nIdade: ").concat(idade, "\nPatrim\u00F4nio: ").concat(patrimonio, "\nEmpregado: ").concat(estaEmpregadoTexto, "\nFilho Marta: ").concat(convertBooleanParaString(filhoMarta));
}
function convertBooleanParaString(valor) {
    if (valor) {
        return "Sim";
    }
    return "Não";
}
exemplo01();

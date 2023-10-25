let min = 1;
let max = 100;
let numeroAlvo = gerarNumeroAleatorio(min, max);
let tentativas = 0;
const maxTentativas = 5;
let tentativasIncorretas = [];

function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function verificarPalpite() {
    if (tentativas >= maxTentativas) {
        exibirMensagem(`Desculpe, você atingiu o número máximo de tentativas. O número correto era ${numeroAlvo}.`);
        desabilitarEntrada();
    } else {
        let palpite = parseInt(document.getElementById("entradaPalpite").value);
        if (palpite >= min && palpite <= max) {
            tentativas++;
            if (palpite === numeroAlvo) {
                exibirMensagem(`Parabéns! Você acertou o número ${numeroAlvo} em ${tentativas} tentativas.`);
                desabilitarEntrada();
            } else if (palpite < numeroAlvo) {
                min = palpite + 1;
                tentativasIncorretas.push(palpite);
                exibirMensagem(`Tente novamente! O número é maior do que ${palpite}. Você tem ${maxTentativas - tentativas} tentativas restantes.`);
            } else {
                max = palpite - 1;
                tentativasIncorretas.push(palpite);
                exibirMensagem(`Tente novamente! O número é menor do que ${palpite}. Você tem ${maxTentativas - tentativas} tentativas restantes.`);
            }
            exibirHistorico();
        } else {
            exibirMensagem("Por favor, insira um número entre 1 e 100.");
        }
    }
}

function exibirMensagem(mensagem) {
    document.getElementById("mensagem").textContent = mensagem;
}

function desabilitarEntrada() {
    document.getElementById("entradaPalpite").disabled = true;
    document.querySelector("button").disabled = true;
}

function exibirHistorico() {
    let historicoLista = document.getElementById("historico");
    historicoLista.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

    tentativasIncorretas.forEach(function (palpite) {
        let itemLista = document.createElement("li");
        if (palpite < numeroAlvo) {
            itemLista.textContent = `Tentativa ${palpite} - O número é maior.`;
        } else {
            itemLista.textContent = `Tentativa ${palpite} - O número é menor.`;
        }
        historicoLista.appendChild(itemLista); // Adiciona o item à lista
    });
}

function resetGame() {
    min = 1;
    max = 100;
    numeroAlvo = gerarNumeroAleatorio(min, max);
    tentativas = 0;
    tentativasIncorretas = [];
    document.getElementById("entradaPalpite").value = "";
    document.getElementById("entradaPalpite").disabled = false;
    document.querySelectorAll("button")[0].disabled = false;
    document.getElementById("mensagem").textContent = "";
    document.getElementById("historico").textContent = "";
}
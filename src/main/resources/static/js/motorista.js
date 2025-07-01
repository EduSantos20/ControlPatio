document.addEventListener("DOMContentLoaded", () => {
    carregarCadastros();
});

function carregarCadastros() {
    fetch("http://localhost:8080/motoristas/listaMotorista")
        .then(response => response.json())
        .then(data => preencherTabela(data));
}

function preencherTabela(cadastros) {
    const tbody = document.getElementById("cadastrosBody");
    tbody.innerHTML = "";

    cadastros.forEach(item => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><input type="checkbox" /></td>
            <td class="${item.marcacao === 'undefined' ? 'marcacao-green' : 'marcacao-red'}">
                ${item.marcacao}
            </td>
            <td>${item.sms}</td>
            <td>${item.cliente}</td>
            <td>${item.transportador}</td>
            <td class="${item.finalidade === 'E' ? 'marcacao-blue':
                    item.finalidade === 'C' ? 'marcacao-white' :
                    item.finalidade === 'D' ? 'marcacao-red' : ''}">
                ${item.finalidade}
            </td>
            <td>Bau ${item.tipoVeiculo} paletes</td>
            <td>${item.placaCavalo}</td>
            <td>${item.placaBau1}</td>
            <td>${item.placaBau2}</td>
            <td>${item.name}</td>
            <td>${item.telephone}</td>
            <td>${formatarData(item.dataCadastro)}</td>
        `;

        tbody.appendChild(tr);
    });
}

function formatarData(dataString) {
    if (!dataString) return "";
    const data = new Date(dataString);
    return data.toLocaleString("pt-BR");
}

document.getElementById("novoCadastroBtn").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "http://localhost:8080/cadastro.html";
});

//filtrando por c, e, d

let todosOsDados = []; // Variável global para armazenar todos os dados

// Função para carregar dados iniciais
function carregarDados() {
    fetch("http://localhost:8080/motoristas/listaMotorista")
        .then(response => response.json())
        .then(data => {
            todosOsDados = data; // Armazena todos os dados
            preencherTabela(data); // Mostra todos inicialmente
        });
}

// Event listener para o filtro
document.getElementById("filtroCDE").addEventListener("change", function() {
    const valorSelecionado = this.value;
    filtrarDados(valorSelecionado);
});

function filtrarDados(filtro) {
    let dadosFiltrados;

    if (filtro === "" || filtro === "todos") {
        dadosFiltrados = todosOsDados;
    } else {
        dadosFiltrados = todosOsDados.filter(item => item.finalidade === filtro);
    }

    preencherTabela(dadosFiltrados);

    // Mostra quantos registros foram encontrados
    console.log(`Encontrados ${dadosFiltrados.length} registros para o filtro: ${filtro}`);
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarDados);
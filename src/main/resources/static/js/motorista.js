document.addEventListener("DOMContentLoaded", () => {
  carregarCadastros()
})

function carregarCadastros() {
  fetch("https://controlpatio.onrender.com/motoristas/listaMotorista")
    .then((response) => response.json())
    .then((data) => preencherTabela(data))
}

function preencherTabela(cadastros) {
  const tbody = document.getElementById("cadastrosBody")
  tbody.innerHTML = ""
  cadastros.forEach((item) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
            <td>
                <input id="checkbox-${item.id}" type="checkbox" />
            </td>
            <td class="${
              item.marcacao === "undefined" ? "marcacao-red" : "marcacao-green"
            }">
                ${item.dataCadastro}
            </td>
            <td>${item.sms}</td>
            <td>${item.cliente}</td>
            <td>${item.transportador}</td>
            <td class="${
              item.finalidade === "E"
                ? "marcacao-blue"
                : item.finalidade === "C"
                ? "marcacao-white"
                : item.finalidade === "D"
                ? "marcacao-red"
                : ""
            }">
                ${item.finalidade}
            </td>
            <td>Bau ${item.tipoVeiculo} paletes</td>
            <td>${item.placaCavalo}</td>
            <td>${item.placaBau1}</td>
            <td>${item.placaBau2}</td>
            <td>${item.name}</td>
            <td>${item.telephone}</td>
            <td>${formatarData(item.dataCadastro)}</td>
            <td id="contador" class="red">Calculando ...</td>
        `

    tbody.appendChild(tr)

    //para verrificar se apenas um checkbox está sendo marcado
    var checkbox = tr.querySelector(`#checkbox-${item.id}`)
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        // Desmarca todos os outros checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
          if (cb !== this) cb.checked = false
        })
      }
    })

    // Adiciona o evento de exclusão ao checkbox
    var checkbox = tr.querySelector(`#checkbox-${item.id}`)
    checkbox.addEventListener("change", () => {
      document.getElementById("excluirBtn").addEventListener("click", () => {
        if (checkbox.checked) {
          excluirMarcacao(item.id, item.telephone)
        }
      })
    })
    //para editar
    checkbox.addEventListener("change", () => {
      document.getElementById("editarBtn").addEventListener("click", () => {
        if (checkbox.checked) {
          editarMotorista(item.id, item.name)
        }
      })
    })
  })
}

function formatarData(dataString) {
  if (!dataString) return ""
  const data = new Date(dataString)
  return data.toLocaleString("pt-BR")
}

document
  .getElementById("novoCadastroBtn")
  .addEventListener("click", function (event) {
    event.preventDefault()
    window.location.href = "https://controlpatio.onrender.com/cadastro.html"
  })

//filtrando por c, e, d
let todosOsDados = [] // Variável global para armazenar todos os dados
// Função para carregar dados iniciais
function carregarDados() {
  fetch("https://controlpatio.onrender.com/motoristas/listaMotorista")
    .then((response) => response.json())
    .then((data) => {
      todosOsDados = data // Armazena todos os dados
      preencherTabela(data) // Mostra todos inicialmente
    })
}
// Event listener para o filtro
document.getElementById("filtroCDE").addEventListener("change", function () {
  const valorSelecionado = this.value
  filtrarDados(valorSelecionado)
})

function filtrarDados(filtro) {
  let dadosFiltrados
  if (filtro === "" || filtro === "todos") {
    dadosFiltrados = todosOsDados
  } else {
    dadosFiltrados = todosOsDados.filter((item) => item.finalidade === filtro)
  }
  preencherTabela(dadosFiltrados)
}
// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarDados)

// Função para contador
function atualizarContadorIndividual(item) {
  const dataReferencia = new Date(item.dataCadastro)

  function atualizar() {
    const agora = new Date()
    const diferencaMs = agora - dataReferencia

    const horas = Math.floor(diferencaMs / (1000 * 60 * 60))
    const minutos = Math.floor((diferencaMs % (1000 * 60 * 60)) / (1000 * 60))
    const segundos = Math.floor((diferencaMs % (1000 * 60)) / 1000)

    const tempoFormatado = `${String(horas).padStart(2, "0")}:${String(
      minutos
    ).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`
    elemento.textContent = tempoFormatado

    if (diferencaMs >= 4 * 60 * 60 * 1000) {
      elemento.classList.remove("verde")
      elemento.classList.add("vermelho")
    } else {
      elemento.classList.remove("vermelho")
      elemento.classList.add("vermelho")
    }
  }

  atualizar() // Inicial
  setInterval(atualizar, 1000) // Atualiza a cada segundo
}
// Função para excluir marcação
function excluirMarcacao(id, telephone) {
  console.log("Excluir chamado para id:", id, "telefone:", telephone)
  if (!confirm("Tem certeza que deseja excluir esta marcação?")) return

  fetch(`http://localhost:8080/motoristas/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("Marcação excluída com sucesso!")
        carregarDados() // Atualiza a tabela
      } else {
        carregarDados()
      }
    })
    .catch(() => alert("Erro ao conectar com o servidor."))
}
// Função para editar motorista
function editarMotorista(id, name) {
  console.log("ID do usuário: ", id)
  console.log("ID do usuário: ", name)
  fetch(`http://localhost:8080/motoristas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("name").value = data.name
      document.getElementById("cpf").value = data.cpf
      document.getElementById("telephone").value = data.telephone
      document.getElementById("transportador").value = data.transportador
      document.getElementById("tipoVeiculo").value
      document.getElementById("placaCavalo").value = data.placaCavalo
      document.getElementById("placaBau1").value = data.placaBau1
      document.getElementById("placaBau2").value = data.placaBau2
      document.getElementById("finalidade").value = data.finalidade
      document.getElementById("cliente").value = data.cliente
      document.getElementById("nf").value = data.nf
      document.getElementById("descricao").value = data.descricao
      window.location.href = "https://controlpatio.onrender.com/cadastro.html"
    })
    .catch((error) => {
      alert("Erro ao carregar dados do motorista para edição.")
      console.error(error)
    })
}

// Filtro por cliente
document.getElementById("filtroCliente").addEventListener("input", function () {
  const filtro = this.value.toLowerCase()
  const linhas = document.querySelectorAll("#cadastrosBody tr")
  linhas.forEach((linha) => {
    // Pega o texto da coluna "Cliente" (índice 3)
    const cliente = linha.children[3]?.textContent.toLowerCase() || ""
    if (cliente.includes(filtro) || linha.classList.contains("loading")) {
      linha.style.display = ""
    } else {
      linha.style.display = "none"
    }
  })
})

// Filtro por transportadora
document
  .getElementById("filtroTransportadora")
  .addEventListener("input", function () {
    const filtro = this.value.toLowerCase()
    const linhas = document.querySelectorAll("#cadastrosBody tr")
    linhas.forEach((linha) => {
      // Pega o texto da coluna "Cliente" (índice 3)
      const cliente = linha.children[4]?.textContent.toLowerCase() || ""
      if (cliente.includes(filtro) || linha.classList.contains("loading")) {
        linha.style.display = ""
      } else {
        linha.style.display = "none"
      }
    })
  })

  // Filtro por placa
  document.getElementById("filtroPlaca").addEventListener("input", function () {
    const filtro = this.value.toLowerCase()
    const linhas = document.querySelectorAll("#cadastrosBody tr")
    linhas.forEach((linha) => {
      // Pega o texto da coluna "Cliente" (índice 3)
      const cliente = linha.children[7]?.textContent.toLowerCase() || ""
      if (cliente.includes(filtro) || linha.classList.contains("loading")) {
        linha.style.display = ""
      } else {
        linha.style.display = "none"
      }
    })
  })


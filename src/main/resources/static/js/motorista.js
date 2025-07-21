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
              item.marcacao === "UNDEFINED" ? "marcacao-red" : "marcacao-green"
            }">
                ${formatarData(item.dataCadastro)}
            </td>
            <td id="mensagem-${item.sms}" >${item.sms}</td>
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
            <td>
                ${item.telephone}
            </td>
            <td>${formatarData1(item.dataCadastro)}</td>
            <td id="status-${item.id}" class="status">Calculando ...</td>
        `

    tbody.appendChild(tr)

    const dataBase = new Date(item.dataCadastro) // data do banco
    const dataAtual = new Date() // data atual

    // Soma 4 horas à data do banco
    const limite = new Date(dataBase.getTime() + 4 * 60 * 60 * 1000)

    // Verifica se a data atual passou do limite
    const passouLimite = dataAtual > limite

    const statusCell = document.getElementById(`status-${item.id}`)

    if (passouLimite) {
      // Calcula o atraso em minutos
      const atrasoMs = dataAtual - limite
      const minutosAtraso = Math.floor(atrasoMs / (1000 * 60))
      const horas = Math.floor(minutosAtraso / 60)
      const minutos = minutosAtraso % 60

      statusCell.textContent = `${horas}h  ${minutos}m`
      statusCell.classList.add("vermelho")
    } else {
      statusCell.textContent = "Em dia"
      statusCell.classList.add("verde")
    }

    let itemSelecionado = null
    // Adiciona evento de clique para selecionar o item
    var checkbox = tr.querySelector(`#checkbox-${item.id}`)
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
          if (cb !== this) cb.checked = false
        })
        itemSelecionadoParaSMS = item
      } else {
        itemSelecionadoParaSMS = null
      }
    })

    //para verrificar se apenas um checkbox está sendo marcado
    var checkbox = tr.querySelector(`#checkbox-${item.id}`)
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        // Desmarca todos os outros checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
          if (cb !== this) cb.checked = false
        })
      }
    })
  })
}
document
  .getElementById("excluirBtn")
  .addEventListener("click", function (event) {
    event.preventDefault()
    mensagem()
    excluir()
  })
function mensagem() {
  if (!itemSelecionadoParaSMS) {
    alert("Selecione uma linha antes de enviar o SMS!")
    return
  }
  const telefone = itemSelecionadoParaSMS.telephone.replace(/\D/g, "")
  const mensagem = prompt(
    "Digite uma mensagem para o motorista para informa por que está sendo desmarcando:"
  )
  if (mensagem && telefone.length >= 10) {
    const url = `https://wa.me/55${telefone}?text=${encodeURIComponent(
      "Olá, motorista se apresente para carregar doca: " + mensagem
    )}`
    window.open(url, "_blank")
  } else if (!mensagem) {
    alert("Mensagem não enviada: você não digitou nada.")
  } else {
    alert("Telefone inválido.")
  }
}
function excluir() {
  fetch(
    `https://controlpatio.onrender.com/motoristas/${itemSelecionadoParaSMS.id}`,
    {
      method: "DELETE",
    }
  )
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
document.getElementById("enviarSMSBtn").addEventListener("click", function () {
  if (!itemSelecionadoParaSMS) {
    alert("Selecione uma linha antes de enviar o SMS!")
    return
  }

  const telefone = itemSelecionadoParaSMS.telephone.replace(/\D/g, "")
  const mensagem = prompt("Informe a doca:")

  if (mensagem && telefone.length >= 10) {
    const url = `https://wa.me/55${telefone}?text=${encodeURIComponent(
      `Olá, motorista. Se apresente para carregar. Doca: ${mensagem}`
    )}`

    // Abre WhatsApp
    window.open(url, "_blank")

    // ✅ Atualiza a célula de mensagem correta
    const mensagemCell = document.querySelector(
      `#mensagem-${itemSelecionadoParaSMS.sms}`
    )

    if (mensagemCell) {
      mensagemCell.textContent = `Acionado para doca: ${mensagem}`
      mensagemCell.classList.add("acionado")
    }
  } else if (!mensagem) {
    alert("Mensagem não enviada: você não digitou nada.")
  } else {
    alert("Telefone inválido.")
  }
})
function formatarData(dataString) {
  if (!dataString) return ""
  const data = new Date(dataString)
  return data.toLocaleString("pt-br")
}
function formatarData1(dataString) {
  if (!dataString) return "" // Verifica se a data é válida
  const data = new Date()
  return data.toLocaleString("pt-br")
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

document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault()

    //const submitBtn = document.getElementById('submitBtn');

    // Validar CPF
    // const cpfInput = document.getElementById('cpf');
    // if (!validateCPF(cpfInput.value)) {
    //     errorMessage.textContent = 'CPF inválido. Verifique os dados e tente novamente.';
    //     errorMessage.style.display = 'block';
    //     cpfInput.focus();
    //     return;
    // }

    const data = {
      name: document.getElementById("name").value,
      cpf: document.getElementById("cpf").value,
      telephone: document.getElementById("telephone").value,
      transportador: document.getElementById("transportador").value,
      tipoVeiculo: document.getElementById("tipoVeiculo").value,
      placaCavalo: document.getElementById("placaCavalo").value,
      placaBau1: document.getElementById("placaBau1").value,
      placaBau2: document.getElementById("placaBau2").value,
      finalidade: document.getElementById("finalidade").value,
      cliente: document.getElementById("cliente").value,
      nf: document.getElementById("nf").value,
      descricao: document.getElementById("descricao").value,
    }

    fetch("http://localhost:8080/motoristas/creat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao salvar")
        }
        alert("Cadastro realizado com sucesso!")
        window.location.href = "http://localhost:8080/index.html"
        document.getElementById("cadastroForm").reset()
      })
      .catch((error) => {
        console.error(error)
        alert("Erro ao salvar cadastro.")
      })
  })

// // Validação de CPF
// function validateCPF(cpf) {
//     cpf = cpf.replace(/[^\d]+/g, '');
//     if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
//
//     let sum = 0;
//     for (let i = 0; i < 9; i++) {
//         sum += parseInt(cpf.charAt(i)) * (10 - i);
//     }
//     let checkDigit = 11 - (sum % 11);
//     if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
//     if (checkDigit !== parseInt(cpf.charAt(9))) return false;
//
//     sum = 0;
//     for (let i = 0; i < 10; i++) {
//         sum += parseInt(cpf.charAt(i)) * (11 - i);
//     }
//     checkDigit = 11 - (sum % 11);
//     if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
//     return checkDigit === parseInt(cpf.charAt(10));
// }
// // Validação em tempo real
// document.getElementById('cpf').addEventListener('blur', function() {
//     if (this.value && !validateCPF(this.value)) {
//         this.style.borderColor = '#e74c3c';
//         this.style.backgroundColor = '#fdf2f2';
//     } else {
//         this.style.borderColor = '#27ae60';
//         this.style.backgroundColor = '#f8fff8';
//     }
// });

//cadastroLogin.html
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(event)

    const dados = {
      name: document.getElementById("name").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }

    fetch("http://localhost:8080/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao salvar")
        }
        alert("Cadastro realizado com sucesso!")
        window.location.href = "http://localhost:8080/login.html"
        document.getElementById("loginForm").reset()
      })
      .catch((error) => {
        console.error(error)
        alert("Erro ao salvar cadastro.")
      })
  })

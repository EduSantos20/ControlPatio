document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("formLogin")
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault()
    realizarLogin()
  })
})
function realizarLogin() {
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  fetch("https://controlpatio.onrender.com/user/exists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        // Login OK → redireciona
        window.location.href = "https://controlpatio.onrender.com"
        document.getElementById("formLogin").reset()
      } else if (response.status === 401) {
        document.getElementById("erro").innerText =
          "Usuário ou senha inválidos."
      } else {
        document.getElementById("erro").innerText = "Erro no servidor."
      }
    })
    .catch((error) => {
      console.error("Erro:", error)
      document.getElementById("erro").innerText =
        "Erro ao conectar com o servidor."
    })
}

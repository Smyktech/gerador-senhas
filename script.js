function gerarSenha() {
  const tamanho = document.getElementById("tamanho").value;
  const usarLetras = document.getElementById("letras").checked;
  const usarNumeros = document.getElementById("numeros").checked;
  const usarSimbolos = document.getElementById("simbolos").checked;
  const nomeSenha = document.getElementById("nomeSenha").value.trim();

  let caracteres = "";
  if (usarLetras) caracteres += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (usarNumeros) caracteres += "0123456789";
  if (usarSimbolos) caracteres += "!@#$%^&*()-_=+[]{}";

  if (caracteres === "") {
    alert("Selecione pelo menos uma opção!");
    return;
  }

  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    const index = Math.floor(Math.random() * caracteres.length);
    senha += caracteres[index];
  }

  document.getElementById("resultado").innerText = senha;
  salvarSenha(senha, nomeSenha);
}

function salvarSenha(senha, nome) {
  const lista = document.getElementById("lista-senhas");

  const item = document.createElement("li");
  const span = document.createElement("span");
  const inputSenha = document.createElement("input");
  const toggleBtn = document.createElement("button");
  const apagarBtn = document.createElement("button");

  span.innerText = nome ? `🔖 ${nome}: ` : "🔖 Sem nome: ";
  inputSenha.type = "password";
  inputSenha.value = senha;
  inputSenha.readOnly = true;

  toggleBtn.textContent = "👁️";
  toggleBtn.onclick = () => {
    inputSenha.type = inputSenha.type === "password" ? "text" : "password";
  };

  apagarBtn.textContent = "❌";
  apagarBtn.onclick = () => {
    lista.removeChild(item);
    let salvas = JSON.parse(localStorage.getItem("senhas")) || [];
    salvas = salvas.filter(s => !(s.nome === nome && s.valor === senha));
    localStorage.setItem("senhas", JSON.stringify(salvas));
  };

  item.appendChild(span);
  item.appendChild(inputSenha);
  item.appendChild(toggleBtn);
  item.appendChild(apagarBtn);
  lista.appendChild(item);

  let salvas = JSON.parse(localStorage.getItem("senhas")) || [];
  salvas.push({ nome: nome || "Sem nome", valor: senha });
  localStorage.setItem("senhas", JSON.stringify(salvas));
}

function apagarTodas() {
  if (confirm("Tem certeza que deseja apagar todas as senhas salvas?")) {
    localStorage.removeItem("senhas");
    document.getElementById("lista-senhas").innerHTML = "";
  }
}

window.onload = function () {
  const salvas = JSON.parse(localStorage.getItem("senhas")) || [];
  salvas.forEach(s => salvarSenha(s.valor, s.nome));
};

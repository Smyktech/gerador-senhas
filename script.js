function gerarSenha() {
  const tamanho = document.getElementById("tamanho").value;
  const usarLetras = document.getElementById("letras").checked;
  const usarNumeros = document.getElementById("numeros").checked;
  const usarSimbolos = document.getElementById("simbolos").checked;
  const nome = document.getElementById("nome-senha").value.trim();

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
  salvarSenha(nome, senha);
}

function salvarSenha(nome, senha) {
  const lista = document.getElementById("lista-senhas");

  const item = document.createElement("li");
  const spanNome = document.createElement("strong");
  spanNome.innerText = nome ? `${nome}: ` : "Senha: ";

  const spanSenha = document.createElement("span");
  spanSenha.innerText = senha;
  spanSenha.classList.add("senha-oculta");

  const btnToggle = document.createElement("button");
  btnToggle.innerText = "👁️";
  btnToggle.className = "toggle-btn";
  btnToggle.onclick = () => {
    spanSenha.classList.toggle("senha-oculta");
  };

  item.appendChild(spanNome);
  item.appendChild(spanSenha);
  item.appendChild(btnToggle);
  lista.appendChild(item);

  let salvas = JSON.parse(localStorage.getItem("senhas")) || [];
  salvas.push({ nome, senha });
  localStorage.setItem("senhas", JSON.stringify(salvas));
}

window.onload = function () {
  const salvas = JSON.parse(localStorage.getItem("senhas")) || [];
  const lista = document.getElementById("lista-senhas");
  salvas.forEach(obj => {
    const item = document.createElement("li");

    const spanNome = document.createElement("strong");
    spanNome.innerText = obj.nome ? `${obj.nome}: ` : "Senha: ";

    const spanSenha = document.createElement("span");
    spanSenha.innerText = obj.senha;
    spanSenha.classList.add("senha-oculta");

    const btnToggle = document.createElement("button");
    btnToggle.innerText = "👁️";
    btnToggle.className = "toggle-btn";
    btnToggle.onclick = () => {
      spanSenha.classList.toggle("senha-oculta");
    };

    item.appendChild(spanNome);
    item.appendChild(spanSenha);
    item.appendChild(btnToggle);
    lista.appendChild(item);
  });
}

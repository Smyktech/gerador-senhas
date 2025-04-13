function gerarSenha() {
    const tamanho = document.getElementById("tamanho").value;
    const usarLetras = document.getElementById("letras").checked;
    const usarNumeros = document.getElementById("numeros").checked;
    const usarSimbolos = document.getElementById("simbolos").checked;
  
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
    salvarSenha(senha);
  }
  
  function salvarSenha(senha) {
    const lista = document.getElementById("lista-senhas");
    const item = document.createElement("li");
    item.textContent = senha;
    lista.appendChild(item);
  
    // salva no navegador
    let salvas = JSON.parse(localStorage.getItem("senhas")) || [];
    salvas.push(senha);
    localStorage.setItem("senhas", JSON.stringify(salvas));
  }
  
  window.onload = function () {
    // carrega senhas salvas quando abrir
    const salvas = JSON.parse(localStorage.getItem("senhas")) || [];
    const lista = document.getElementById("lista-senhas");
    salvas.forEach(senha => {
      const item = document.createElement("li");
      item.textContent = senha;
      lista.appendChild(item);
    });
  }
  
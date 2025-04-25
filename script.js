function generatePassword() {
  const length = document.getElementById("length").value;
  const includeLetters = document.getElementById("letters").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;
  const name = document.getElementById("passwordName").value;

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+";

  let characters = "";
  if (includeLetters) characters += letters;
  if (includeNumbers) characters += numbers;
  if (includeSymbols) characters += symbols;

  if (!characters) {
    alert("Selecione pelo menos uma opção.");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  document.getElementById("generatedPassword").textContent = password;

  const passwordObj = { name, password, hidden: true };
  savePassword(passwordObj);
  renderPasswords();
}

function savePassword(passwordObj) {
  let saved = JSON.parse(localStorage.getItem("passwords")) || [];
  saved.push(passwordObj);
  localStorage.setItem("passwords", JSON.stringify(saved));
}

function renderPasswords() {
  const saved = JSON.parse(localStorage.getItem("passwords")) || [];
  const container = document.getElementById("savedPasswords");
  container.innerHTML = "";

  saved.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "password-item";

    const text = document.createElement("div");
    text.className = "password-text";
    text.textContent = item.name ? `${item.name}: ${item.hidden ? "******" : item.password}` : (item.hidden ? "******" : item.password);

    const actions = document.createElement("div");
    actions.className = "password-actions";

    const copyBtn = document.createElement("button");
    copyBtn.innerHTML = `<i class="ph ph-copy"></i>`;
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(item.password);
      alert("Senha copiada!");
    };

    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = `<i class="ph ${item.hidden ? "ph-eye" : "ph-eye-slash"}"></i>`;
    toggleBtn.onclick = () => {
      item.hidden = !item.hidden;
      localStorage.setItem("passwords", JSON.stringify(saved));
      renderPasswords();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="ph ph-trash"></i>`;
    deleteBtn.onclick = () => {
      saved.splice(index, 1);
      localStorage.setItem("passwords", JSON.stringify(saved));
      renderPasswords();
    };

    actions.appendChild(copyBtn);
    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    div.appendChild(text);
    div.appendChild(actions);
    container.appendChild(div);
  });
}

function clearPasswords() {
  if (confirm("Tem certeza que deseja apagar todas as senhas?")) {
    localStorage.removeItem("passwords");
    renderPasswords();
  }
}

function exportPasswords() {
  const saved = JSON.parse(localStorage.getItem("passwords")) || [];
  let text = "";
  saved.forEach(p => {
    text += (p.name ? `${p.name}: ` : "") + `${p.password}\n`;
  });

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "senhas.txt";
  link.click();
  URL.revokeObjectURL(url);
}

document.getElementById("toggle-tema").addEventListener("click", () => {
  document.body.classList.toggle("claro");
  const btn = document.getElementById("toggle-tema");
  btn.textContent = document.body.classList.contains("claro") ? "☀️" : "🌙";
});

window.onload = renderPasswords;

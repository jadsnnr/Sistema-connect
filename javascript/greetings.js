const saudações = document.querySelector(".greetings");

function obterSaudacao() {
  const horaAtual = new Date().getHours();

  if (horaAtual < 12) {
    return "Bom dia";
  } else if (horaAtual < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}
saudações.innerText = obterSaudacao();
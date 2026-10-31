const salvarOC = document.getElementById("orcForm");

if (salvarOC) {
  salvarOC.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cliente = document.getElementById("cliente").value;

    const veiculo = document.getElementById("veiculo").value;

    const placa = document.getElementById("placa").value;

    const defeito = document.getElementById("defeito").value;

    const defeito2 = document.getElementById("defeito2").value;

    const defeito3 = document.getElementById("defeito3").value;

    const servico = document.getElementById("servico").value;

    const observacao = document.getElementById("observacao").value;

    const valor = document.getElementById("valor").value;

    const imagemInput = document.getElementById("imagem");

    const imagem2Input = document.getElementById("imagem2");

    const imagem3Input = document.getElementById("imagem3");

    const imagem4Input = document.getElementById("imagem4");

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    const logo = new Image();

    logo.src = "styles/assets/logo01.png";

    logo.onload = async () => {
      doc.addImage(logo, "PNG", 15, 10, 40, 20);

      doc.setFontSize(22);

      doc.text("ORÇAMENTO", 105, 20, { align: "center" });

      doc.setDrawColor(200);

      doc.line(15, 35, 195, 35);

      /* =========================
         DADOS CLIENTE
      ========================= */

      doc.setFontSize(12);

      doc.text(`Cliente: ${cliente}`, 20, 50);

      doc.text(`Veículo: ${veiculo}`, 20, 60);

      doc.text(`Placa: ${placa}`, 20, 70);

      doc.text(`Serviço: ${servico}`, 20, 80);

      /* =========================
         DEFEITOS
      ========================= */

      doc.text("Defeitos Informados:", 20, 100);

      doc.text(`• ${defeito}`, 25, 120);

      let linha = 100;

      if (defeito2 && !defeito3) {
      doc.text(`• ${defeito}`, 25, 120);
      let linha = 130;
        doc.text(`• ${defeito2}`, 25, linha);
        linha += 10;
      }else if (defeito2 && defeito3) {
        doc.text(`• ${defeito}`, 25, 120);
        let linha = 130;
        doc.text(`• ${defeito2}`, 25, linha);
        linha += 10;
        doc.text(`• ${defeito3}`, 25, linha);
        linha += 10;
      }

      /* =========================
         OBSERVAÇÕES
      ========================= */

      linha += 60;

      doc.text("Observações:", 20, linha);

      linha += 10;

      doc.text(observacao || "Nenhuma observação", 25, linha);

      /* =========================
         VALOR
      ========================= */

      linha += 10;

      const valorFormatado = Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      doc.setFontSize(18);

      doc.text(`Valor Total: ${valorFormatado}`, 20, linha);

      /* =========================
         IMAGENS
      ========================= */

      linha += 10;

      async function adicionarImagem(input, x, y) {
        if (input.files && input.files[0]) {
          return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = function (event) {
              doc.addImage(event.target.result, "JPEG", x, y, 60, 60);

              resolve();
            };

            reader.readAsDataURL(input.files[0]);
          });
        }
      }

      await adicionarImagem(imagemInput, 20, linha);

      await adicionarImagem(imagem2Input, 90, linha);

      linha += 70;

      await adicionarImagem(imagem3Input, 20, linha);

      await adicionarImagem(imagem4Input, 90, linha);

      /* =========================
         RODAPÉ
      ========================= */

      doc.setFontSize(10);
      doc.save(`orcamento-${cliente}.pdf`);
    };
  });
}

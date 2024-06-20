
fetch("../../arquivos/ORNGS_A.txt")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erro ao carregar o arquivo: " + response.statusText);
    }
    return response.text();
  })
  .then((text) => {
    const rows = text.split("\n");
    const table = document.createElement("table");
    const tableContainer = document.getElementById("tableContainer");

    // Cabeçalho
    const headerRow = table.insertRow();
    rows[0].split(",").forEach((headerCell) => {
      const th = document.createElement("th");
      th.textContent = headerCell;
      headerRow.appendChild(th);
    });

    // Mapeamento de botões para turnos
    const turnos = {
      btnTurno1: "1",
      btnTurno2: "2",
      btnTurno3: "3",
    };

    // Função para filtrar e exibir dados por turno
    function filtrarTurno(turno) {
      table.innerHTML = ""; // Limpar tabela existente
      table.appendChild(headerRow.cloneNode(true)); // Manter o cabeçalho

      for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].split(",");
        if (cells[0] === turno) { // Filtrar pela primeira coluna (TURNO)
          const dataRow = table.insertRow();
          cells.forEach((cell) => {
            const td = document.createElement("td");
            td.textContent = cell;
            dataRow.appendChild(td);
          });
        }
      }
    }

    // Adicionar eventos aos botões
    for (const btnId in turnos) {
      document
        .getElementById(btnId)
        .addEventListener("click", () => filtrarTurno(turnos[btnId]));
    }

    // Exibir o primeiro turno por padrão
    filtrarTurno("1");

    tableContainer.appendChild(table);
  })
  .catch((error) => {
    console.error("Erro ao ler o arquivo:", error);
    tableContainer.innerHTML = "<p>Erro ao carregar os dados.</p>";
  });


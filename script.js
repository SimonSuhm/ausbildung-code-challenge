let csv = [];

document.getElementById("csv").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const rows = e.target.result
      .split(/(?<=\.jpg|Bildname)/) // Splitte nach ".jpg" oder "Bildname" und behalte sie bei
      .map((row) => row.split(";").map((cell) => cell.trim())); // Teile weiter durch ";" und entferne Leerzeichen
    rows[rows.length - 1].length--;
    csv = rows;
    displayTable();
    updateGendersChart();
    updateProductsChart();
  };
  reader.readAsText(file);
});

function displayTable() {
  const table = document.getElementById("Tabelle");
  table.innerHTML = "";
  csv.forEach((row, i) => {
    const tr = document.createElement("tr");
    row.forEach((cell, j) => {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.value = cell;
      input.oninput = (e) => (csv[i][j] = e.target.value);
      td.appendChild(input);
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}

// function exportCSV() {
//   const csvContent = csvData.map((row) => row.join(";")).join("\n");
//   const blob = new Blob([csvContent], { type: "text/csv" });
//   const a = document.createElement("a");
//   a.href = URL.createObjectURL(blob);
//   a.download = "bearbeitet.csv";
//   a.click();
// }
function addEmptyRow() {
  const newRow = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];
  csv.push(newRow);
  displayTable();
}

//Durchsucht CSV nach den Geschlechtern und zählt sie
function updateGendersChart() {
  let array = csv;
  let targetWords = ["Herren", "Damen", "Kinder", "Babies"];
  let wordCount = {};
  array.forEach((subArray) => {
    subArray.forEach((word) => {
      if (targetWords.includes(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
  });
  let genders = Object.values(wordCount);
  const newValues = genders;
  gendersChart.data.datasets[0].data = newValues;
  gendersChart.update();
}

function updateProductsChart() {
  let array = csv;
  let targetWords = [
    "T-Shirts",
    "Poloshirts",
    "Taschen",
    "Caps",
    "Pullover",
    "Sweatjacken",
    "Bademäntel",
    "Handtücher",
    "Mützen",
    "Hüte",
    "Schals",
    "Handschuhe",
    "Arbeitshosen",
    "Krawatten",
    "Schuhe",
    "Shorts",
    "Jacken",
    "Westen",
    "Decken",
    "Schürzen",
    "Hemden",
    "Blusen",
    "Lätzchen",
    "Unterwäsche",
    "Jogginghosen",
    "Blazer",
    "Freizeithose",
    "Hosen",
    "Bodies & Schlafanzüge",
    "Koch-Jacken",
    "Schirme",
    "Kittel & Kasacks",
    "Teddybären",
  ];
  let wordCount = {};
  array.forEach((subArray) => {
    subArray.forEach((word) => {
      if (targetWords.includes(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
  });
  let products = Object.values(wordCount);
  const newValues = products;
  productsChart.data.datasets[0].data = newValues;
  productsChart.update();
}


const $ = selector => document.querySelector(selector);

/* =====================================
   DADOS E ARMAZENAMENTO
===================================== */

let diary = JSON.parse(
  localStorage.getItem("meunutri_diary") || "[]"
);

let replacements = JSON.parse(
  localStorage.getItem("meunutri_replacements") || "{}"
);

const MENU_STORAGE_KEY = "meunutri_ru_menu";

let ruMenu = JSON.parse(
  localStorage.getItem(MENU_STORAGE_KEY) || "{}"
);

let selectedFood = null;
let selectedReplacement = null;

const MEAL_TYPES = {
  breakfast: {
    name: "Café da manhã",
    input: "#breakfastFile",
    status: "#breakfastStatus"
  },

  lunch: {
    name: "Almoço",
    input: "#lunchFile",
    status: "#lunchStatus"
  },

  dinner: {
    name: "Jantar",
    input: "#dinnerFile",
    status: "#dinnerStatus"
  }
};

const WEEKDAYS = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo"
];

function save() {
  localStorage.setItem(
    "meunutri_diary",
    JSON.stringify(diary)
  );

  localStorage.setItem(
    "meunutri_replacements",
    JSON.stringify(replacements)
  );
}

function saveMenu() {
  localStorage.setItem(
    MENU_STORAGE_KEY,
    JSON.stringify(ruMenu)
  );
}

/* =====================================
   NAVEGAÇÃO
===================================== */

function showPage(page) {
  document.querySelectorAll(".page").forEach(section => {
    section.classList.toggle(
      "active",
      section.id === page
    );
  });

  document.querySelectorAll("[data-page]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === page
    );
  });
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

/* =====================================
   BANCO DE ALIMENTOS
===================================== */

function findFood(name) {
  return FOODS.find(food =>
    food.name.toLowerCase() === name.toLowerCase()
  );
}

function getSubstitutions(name) {
  const original = findFood(name);

  if (!original) return [];

  return FOODS.filter(food =>
    food.group === original.group &&
    food.name !== original.name
  );
}

function renderFoods() {
  const search = $("#foodSearch").value.toLowerCase();
  const group = $("#groupFilter").value;

  const list = $("#foodList");

  list.innerHTML = "";

  FOODS.filter(food =>
    food.name.toLowerCase().includes(search) &&
    (!group || food.group === group)
  ).forEach(food => {
    const card = document.createElement("div");
    card.className = "food-card";

    const name = document.createElement("strong");
    name.textContent = food.name;

    const details = document.createElement("p");

    details.textContent =
      `${food.group} · ${food.reference} · ${food.kcal} kcal`;

    card.append(name, details);

    list.append(card);
  });
}

$("#foodSearch").addEventListener(
  "input",
  renderFoods
);

$("#groupFilter").addEventListener(
  "change",
  renderFoods
);

/* =====================================
   PLANO ALIMENTAR
===================================== */

function getMealFoodName(meal, index) {
  return replacements[`${meal.id}-${index}`]?.name ||
    meal.foods[index][0];
}

function renderPlan() {
  const container = $("#mealList");

  container.innerHTML = "";

  MEALS.forEach(meal => {
    const card = document.createElement("article");
    card.className = "meal-card";

    const heading = document.createElement("div");
    heading.className = "meal-header";

    const title = document.createElement("h3");
    title.textContent = meal.name;

    const time = document.createElement("span");
    time.className = "meal-time";
    time.textContent = meal.time;

    heading.append(title, time);

    card.append(heading);

    meal.foods.forEach((item, index) => {
      const currentName = getMealFoodName(meal, index);
      const current = findFood(currentName);

      const row = document.createElement("div");
      row.className = "food-row";

      const info = document.createElement("div");

      const name = document.createElement("strong");
      name.textContent = currentName;

      const reference = document.createElement("div");
      reference.className = "food-reference";

      reference.textContent = current
        ? `Porção da tabela: ${current.reference}`
        : `Plano original: ${item[1]}`;

      info.append(name, reference);

      const button = document.createElement("button");

      button.textContent = "Substituir";

      button.addEventListener("click", () => {
        openReplacement(meal, index);
      });

      row.append(info, button);

      card.append(row);
    });

    const registerButton = document.createElement("button");

    registerButton.className = "primary";
    registerButton.textContent = `Registrar ${meal.name}`;

    registerButton.addEventListener("click", () => {
      registerMeal(meal);
    });

    card.append(registerButton);

    container.append(card);
  });

  renderHome();
}

function renderHome() {
  const total = MEALS.reduce(
    (sum, meal) => sum + meal.foods.length,
    0
  );

  $("#foodCount").textContent = total;

  $("#mealCount").textContent =
    `${diary.length}/6`;

  $("#homeMeals").innerHTML = "";

  MEALS.forEach(meal => {
    const card = document.createElement("div");

    card.className = "card";

    card.textContent =
      `${meal.time} · ${meal.name}`;

    $("#homeMeals").append(card);
  });

  const now = new Date();

  const currentTime =
    now.getHours() * 60 + now.getMinutes();

  const next = MEALS.find(meal => {
    const [hour, minute] = meal.time
      .split(":")
      .map(Number);

    return hour * 60 + minute > currentTime;
  }) || MEALS[0];

  $("#nextMeal").textContent =
    `${next.name} · ${next.time}`;
}

/* =====================================
   SUBSTITUIÇÃO DE ALIMENTOS
===================================== */

function openReplacement(meal, index) {
  const originalName = meal.foods[index][0];

  const currentName = getMealFoodName(
    meal,
    index
  );

  const original = findFood(originalName);
  const current = findFood(currentName);

  if (!original) {
    alert("Alimento original não encontrado na tabela.");
    return;
  }

  if (!current) {
    alert("Não foi possível localizar o alimento atual.");
    return;
  }

  selectedFood = {
    meal,
    index,
    original,
    current
  };

  selectedReplacement = null;

  $("#replacementInfo").textContent =
    `${current.name}. Grupo: ${current.group}. Porção de referência: ${current.reference}.`;

  const select = $("#replacementSelect");

  select.innerHTML =
    '<option value="">Selecione um alimento</option>';

  getSubstitutions(currentName).forEach(food => {
    const option = document.createElement("option");

    option.value = food.id;

    option.textContent =
      `${food.name} · ${food.reference}`;

    select.append(option);
  });

  $("#replacementResult").textContent = "";

  $("#confirmReplacement").disabled = true;

  select.onchange = () => {
    selectedReplacement = FOODS.find(
      food => food.id === Number(select.value)
    );

    $("#confirmReplacement").disabled =
      !selectedReplacement;

    $("#replacementResult").textContent =
      selectedReplacement
        ? `Porção equivalente: ${selectedReplacement.reference}. Referência: ${selectedReplacement.kcal} kcal.`
        : "";
  };

  $("#replacementDialog").showModal();
}

$("#confirmReplacement").addEventListener("click", () => {
  if (!selectedFood || !selectedReplacement) {
    return;
  }

  const key =
    `${selectedFood.meal.id}-${selectedFood.index}`;

  replacements[key] = {
    name: selectedReplacement.name,
    reference: selectedReplacement.reference
  };

  save();

  renderPlan();

  $("#replacementDialog").close();
});

/* =====================================
   DIÁRIO ALIMENTAR
===================================== */

function renderDiary() {
  const list = $("#diaryList");

  list.innerHTML = "";

  if (!diary.length) {
    list.textContent =
      "Nenhum consumo registrado.";

    return;
  }

  diary.slice().reverse().forEach(entry => {
    const card = document.createElement("div");

    card.className = "card";

    card.textContent =
      `${entry.date} · ${entry.meal} · ${entry.food}`;

    list.append(card);
  });
}

function registerMeal(meal) {
  diary.push({
    date: new Date().toLocaleString("pt-BR"),

    meal: meal.name,

    food: meal.foods
      .map((_, index) => getMealFoodName(meal, index))
      .join(", ")
  });

  save();

  renderDiary();
  renderHome();

  alert(`${meal.name} registrada no diário.`);
}

/* =====================================
   IMPORTAÇÃO DOS PDFs DO RU
===================================== */

function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function identifyWeekday(line) {
  const normalized = normalizeText(line);

  const patterns = [
    {
      day: "Segunda-feira",
      regex: /\bsegunda(?:-feira)?\b/
    },
    {
      day: "Terça-feira",
      regex: /\bterca(?:-feira)?\b/
    },
    {
      day: "Quarta-feira",
      regex: /\bquarta(?:-feira)?\b/
    },
    {
      day: "Quinta-feira",
      regex: /\bquinta(?:-feira)?\b/
    },
    {
      day: "Sexta-feira",
      regex: /\bsexta(?:-feira)?\b/
    },
    {
      day: "Sábado",
      regex: /\bsabado\b/
    },
    {
      day: "Domingo",
      regex: /\bdomingo\b/
    }
  ];

  const result = patterns.find(item =>
    item.regex.test(normalized)
  );

  return result ? result.day : null;
}

function removeWeekdayFromLine(line) {
  return line
    .replace(/segunda(?:-feira)?/gi, "")
    .replace(/terça(?:-feira)?/gi, "")
    .replace(/terca(?:-feira)?/gi, "")
    .replace(/quarta(?:-feira)?/gi, "")
    .replace(/quinta(?:-feira)?/gi, "")
    .replace(/sexta(?:-feira)?/gi, "")
    .replace(/sábado/gi, "")
    .replace(/sabado/gi, "")
    .replace(/domingo/gi, "")
    .replace(/^\s*[-:|,;]+\s*/, "")
    .trim();
}

/* =====================================
   LEITURA DO PDF
===================================== */

async function extractPdfLines(file) {
  if (!window.pdfjsLib) {
    throw new Error(
      "PDF.js não foi carregado. Verifique sua conexão e atualize a página."
    );
  }

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  const buffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(buffer)
  }).promise;

  const allLines = [];

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {
    const page = await pdf.getPage(pageNumber);

    const content = await page.getTextContent();

    const items = content.items
      .filter(item =>
        item.str && item.str.trim()
      )
      .map(item => ({
        text: item.str.trim(),
        x: item.transform[4],
        y: item.transform[5]
      }));

    items.sort((a, b) => {
      if (Math.abs(b.y - a.y) > 3) {
        return b.y - a.y;
      }

      return a.x - b.x;
    });

    const pageLines = [];

    items.forEach(item => {
      let line = pageLines.find(current =>
        Math.abs(current.y - item.y) <= 3
      );

      if (!line) {
        line = {
          y: item.y,
          items: []
        };

        pageLines.push(line);
      }

      line.items.push(item);
    });

    pageLines.sort((a, b) => b.y - a.y);

    pageLines.forEach(line => {
      line.items.sort((a, b) => a.x - b.x);

      const text = line.items
        .map(item => item.text)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      if (text) {
        allLines.push(text);
      }
    });
  }

  return allLines;
}

/* =====================================
   ORGANIZAÇÃO POR DIA
===================================== */

function organizeMenuLines(lines) {
  const organized = {};

  WEEKDAYS.forEach(day => {
    organized[day] = [];
  });

  organized["Não identificado"] = [];

  let currentDay = null;

  lines.forEach(originalLine => {
    const line = originalLine.trim();

    if (!line) return;

    const detectedDay = identifyWeekday(line);

    if (detectedDay) {
      currentDay = detectedDay;

      const remainingText =
        removeWeekdayFromLine(line);

      if (remainingText) {
        organized[currentDay].push(remainingText);
      }

      return;
    }

    if (currentDay) {
      organized[currentDay].push(line);
    } else {
      organized["Não identificado"].push(line);
    }
  });

  Object.keys(organized).forEach(day => {
    organized[day] = organized[day]
      .map(line => line.trim())
      .filter(Boolean);
  });

  return organized;
}

/* =====================================
   IMPORTAR UM PDF
===================================== */

async function importMenuPdf(mealKey, file) {
  const meal = MEAL_TYPES[mealKey];

  const status = $(meal.status);

  if (!file) {
    status.textContent =
      "Nenhum arquivo selecionado.";

    return;
  }

  status.textContent =
    `Processando ${file.name}...`;

  status.classList.remove("error");

  try {
    if (
      !file.type.includes("pdf") &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      throw new Error(
        "O arquivo selecionado não é um PDF."
      );
    }

    const lines = await extractPdfLines(file);

    if (!lines || lines.length === 0) {
      throw new Error(
        "Não foi possível extrair texto do PDF. O documento pode ser uma imagem."
      );
    }

    const organized = organizeMenuLines(lines);

    const totalLines = Object.values(organized)
      .flat()
      .filter(Boolean).length;

    if (!totalLines) {
      throw new Error(
        "Nenhum conteúdo foi identificado no PDF."
      );
    }

    ruMenu[mealKey] = organized;

    ruMenu[`${mealKey}_filename`] =
      file.name;

    ruMenu[`${mealKey}_updated`] =
      new Date().toISOString();

    saveMenu();

    status.textContent =
      `Importado: ${file.name}`;

    const identifiedDays = WEEKDAYS.filter(day =>
      organized[day]?.length
    );

    renderRuMenu();

    if (identifiedDays.length === 0) {
      alert(
        `${meal.name} foi lido, mas nenhum dia da semana foi identificado. Confira a organização do documento.`
      );
    } else {
      alert(
        `${meal.name} importado com sucesso! ${identifiedDays.length} dia(s) identificado(s).`
      );
    }

  } catch (error) {
    console.error(
      `Erro ao importar ${meal.name}:`,
      error
    );

    status.textContent =
      `Erro: ${error.message}`;

    status.classList.add("error");

    alert(
      `Erro na importação de ${meal.name}: ${error.message}`
    );
  }
}

/* =====================================
   EVENTOS DOS TRÊS PDFs
===================================== */

Object.keys(MEAL_TYPES).forEach(mealKey => {
  const meal = MEAL_TYPES[mealKey];

  const input = $(meal.input);

  const status = $(meal.status);

  input.addEventListener("change", async event => {
    const file = event.target.files?.[0];

    if (!file) return;

    status.textContent =
      `Processando ${file.name}...`;

    status.classList.remove("error");

    try {
      await importMenuPdf(mealKey, file);

    } catch (error) {
      console.error(error);

      status.textContent =
        `Erro: ${error.message}`;

      status.classList.add("error");

    } finally {
      input.value = "";
    }
  });
});

/* =====================================
   SEPARAÇÃO DOS PRATOS E INGREDIENTES
===================================== */

function parseMenuItems(lines) {
  const items = [];

  const headingPattern =
    /(?:^|\s)([A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ][A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ0-9() /-]{2,}):/g;

  lines.forEach(line => {
    const matches = [
      ...line.matchAll(headingPattern)
    ];

    if (!matches.length) {
      if (items.length) {
        items[items.length - 1].ingredients +=
          " " + line.trim();
      }

      return;
    }

    const firstPosition = matches[0].index;

    if (firstPosition > 0 && items.length) {
      const continuation = line
        .slice(0, firstPosition)
        .trim();

      if (continuation) {
        items[items.length - 1].ingredients +=
          " " + continuation;
      }
    }

    matches.forEach((match, index) => {
      const name = match[1].trim();

      const start =
        match.index + match[0].length;

      const end = index + 1 < matches.length
        ? matches[index + 1].index
        : line.length;

      const ingredients = line
        .slice(start, end)
        .trim()
        .replace(/^[\s:;,-]+/, "");

      items.push({
        name,
        ingredients
      });
    });
  });

  return items.filter(item => item.name);
}

/* =====================================
   EXIBIÇÃO DO CARDÁPIO
===================================== */

function renderRuMenu() {
  const selectedDay = $("#menuDay").value;

  const container = $("#menuResult");

  editorDetails.className = "ru-editor-details";
  editorDetails.open = false;

  container.innerHTML = "";

  const mealKeys = [
    "breakfast",
    "lunch",
    "dinner"
  ];

  mealKeys.forEach(mealKey => {
    const meal = MEAL_TYPES[mealKey];

    const lines =
      ruMenu[mealKey]?.[selectedDay] || [];

    const items = parseMenuItems(lines);

    const card = document.createElement("section");

    card.className =
      `ru-meal-card ru-${mealKey}`;

    /* Cabeçalho */

    const header = document.createElement("div");

    header.className = "ru-meal-heading";

    const titleArea = document.createElement("div");

    const title = document.createElement("h3");

    title.textContent = meal.name;

    const subtitle = document.createElement("span");

    subtitle.textContent =
      `${items.length} preparações`;

    titleArea.append(title, subtitle);

    const icon = document.createElement("span");

    icon.className = "ru-meal-icon";

    icon.textContent = {
      breakfast: "☕",
      lunch: "🍛",
      dinner: "🌙"
    }[mealKey];

    header.append(icon, titleArea);

    card.append(header);

    /* Nome do arquivo */

    const filename = document.createElement("p");

    filename.className = "ru-file-name";

    filename.textContent =
      ruMenu[`${mealKey}_filename`]
        ? `PDF: ${ruMenu[`${mealKey}_filename`]}`
        : "Nenhum PDF importado.";

    card.append(filename);

    /* Preparações */

    if (items.length) {
      const grid = document.createElement("div");

      grid.className = "ru-food-grid";

      items.forEach(item => {
        const foodCard =
          document.createElement("article");

        foodCard.className = "ru-food-item";

        const foodTitle =
          document.createElement("h4");

        foodTitle.textContent = item.name;

        const ingredients =
          document.createElement("p");

        ingredients.textContent =
          item.ingredients ||
          "Ingredientes não identificados.";

        foodCard.append(
          foodTitle,
          ingredients
        );

        grid.append(foodCard);
      });

      card.append(grid);

    } else {
      const empty = document.createElement("p");

      empty.className = "empty";

      empty.textContent =
        "Nenhuma preparação cadastrada para este dia.";

      card.append(empty);
    }

    /* Editor do texto original */

    const editorDetails =
      document.createElement("details");

    editorDetails.className =
      "ru-editor-details";

    const editorSummary =
      document.createElement("summary");

    editorSummary.textContent =
      "Editar texto original";

    const editor =
      document.createElement("textarea");

    editor.className = "menu-editor";

    editor.rows = 8;

    editor.value = lines.join("\n");

    const saveButton =
      document.createElement("button");

    saveButton.className = "primary";

    saveButton.textContent =
      "Salvar alterações";

    saveButton.addEventListener("click", () => {
      const editedLines = editor.value
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

      if (!ruMenu[mealKey]) {
        ruMenu[mealKey] = {};
      }

      ruMenu[mealKey][selectedDay] =
        editedLines;

      saveMenu();

      renderRuMenu();
    });

    editorDetails.append(
      editorSummary,
      editor,
      saveButton
    );

    card.append(editorDetails);

    container.append(card);
  });
}

/* =====================================
   SELEÇÃO DO DIA
===================================== */

$("#menuDay").addEventListener(
  "change",
  renderRuMenu
);

/* =====================================
   APAGAR CARDÁPIOS
===================================== */

$("#clearMenu").addEventListener("click", () => {
  const confirmed = confirm(
    "Deseja apagar os três cardápios importados?"
  );

  if (!confirmed) return;

  ruMenu = {};

  saveMenu();

  Object.keys(MEAL_TYPES).forEach(mealKey => {
    const meal = MEAL_TYPES[mealKey];

    $(meal.status).textContent =
      "Nenhum arquivo importado.";

    $(meal.status).classList.remove("error");
  });

  renderRuMenu();
});

/* =====================================
   INICIALIZAÇÃO
===================================== */

function initialize() {
  const groups = [
    ...new Set(FOODS.map(food => food.group))
  ];

  groups.forEach(group => {
    const option = document.createElement("option");

    option.value = group;
    option.textContent = group;

    $("#groupFilter").append(option);
  });

  Object.keys(MEAL_TYPES).forEach(mealKey => {
    const meal = MEAL_TYPES[mealKey];

    if (ruMenu[`${mealKey}_filename`]) {
      $(meal.status).textContent =
        `Importado: ${ruMenu[`${mealKey}_filename`]}`;
    }
  });

  renderPlan();
  renderFoods();
  renderDiary();
  renderRuMenu();
}

initialize();

/* =====================================
   SERVICE WORKER
===================================== */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .catch(error => {
        console.error(
          "Erro ao registrar Service Worker:",
          error
        );
      });
  });
}

const items = [
  { name: "Обычный", img: "Обычный.png", weight: 80 },
  { name: "Редкий", img: "Редкий.png", weight: 15 },
  { name: "Эпик", img: "Эпический.png", weight: 4 },
  { name: "Легендарка", img: "Легендарный.png", weight: 1 }
];

const prizesContainer = document.getElementById("prizes");
const spinBtn = document.getElementById("spinBtn");
const itemWidth = 120; // ширина одного приза
const duplicatesCount = 10; // сколько раз дублируем для бесконечности

// Создаем "взвешенный" массив индексов с учетом шансов
let weightedIndexes = [];
items.forEach((item, index) => {
  for (let i = 0; i < item.weight; i++) {
    weightedIndexes.push(index);
  }
});

// Функция выбора случайного индекса по весам
function getRandomWeightedIndex() {
  const rand = Math.floor(Math.random() * weightedIndexes.length);
  return weightedIndexes[rand];
}

// Функция создания рулетки с повторяющимися предметами
function createPrizes() {
  prizesContainer.innerHTML = "";

  for (let i = 0; i < duplicatesCount; i++) {
    for (let j = 0; j < items.length; j++) {
      const index = getRandomWeightedIndex();
      const item = items[index];

      const div = document.createElement("div");
      div.className = "prize";
      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.name;
      div.appendChild(img);
      prizesContainer.appendChild(div);
    }
  }
}

createPrizes();

function spin() {
  if (spinBtn.disabled) return;
  spinBtn.disabled = true;

  const totalPrizes = prizesContainer.children.length;

  // Выбираем приз по весам
  const prizeIndex = getRandomWeightedIndex();

  // Случайное число полных кругов (3-5)
  const cycles = Math.floor(Math.random() * 3) + 3;

  // Итоговый индекс остановки
  const stopIndex = cycles * items.length + prizeIndex;
  const offset = stopIndex * itemWidth;

  // Запускаем анимацию (2 секунды)
  prizesContainer.style.transition = "left 2s cubic-bezier(0.25, 1, 0.5, 1)";
  prizesContainer.style.left = `-${offset}px`;

  setTimeout(() => {
    // Находим приз по центру рулетки
    const roulette = document.querySelector(".roulette");
    const rouletteRect = roulette.getBoundingClientRect();
    const centerX = rouletteRect.left + rouletteRect.width / 2;

    const prizeElements = document.querySelectorAll(".prize");
    let wonItemName = "Не найден";
    prizeElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (centerX >= rect.left && centerX <= rect.right) {
        const img = el.querySelector("img");
        wonItemName = img.alt;
      }
    });

    alert(`🎉 Поздравляем! Вы выиграли: ${wonItemName}`);

    // Сброс позиции рулетки без анимации (чтобы не было пустот)
    prizesContainer.style.transition = "none";
    const resetIndex = stopIndex % totalPrizes;
    prizesContainer.style.left = `-${resetIndex * itemWidth}px`;

    setTimeout(() => {
      spinBtn.disabled = false;
      location.reload(); // перезагружаем страницу автоматически
    }, 100);
  }, 2100);
}

spinBtn.addEventListener("click", spin);

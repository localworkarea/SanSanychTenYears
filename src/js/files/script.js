// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("seeds-container");
  const seedImage = container.querySelector(".section-03__sunflower");

  let seedPositions = [];
  const maxSeedCount = 50; // Максимальное количество семечек
  const minDistance = 60; // Минимальное расстояние между семечками

  // Функция для создания и распределения семечек
  function createAndDistributeSeeds() {
    seedPositions = [];
    container.innerHTML = ""; // Очищаем контейнер перед добавлением семечек

    const seedCounts = [Math.ceil(maxSeedCount / 3), Math.ceil(maxSeedCount / 3), Math.floor(maxSeedCount / 3)];
    const seedClasses = ["seed-slow", "seed-medium", "seed-fast"];
    let seedCountIndex = 0;

    for (let i = 0; i < seedCounts.length; i++) {
      for (let j = 0; j < seedCounts[i]; j++) {
        let seedClone = seedImage.cloneNode(true);
        let left, top;

        do {
          left = Math.random() * window.innerWidth;
          top = Math.random() * window.innerHeight;
        } while (!isValidPosition(left, top, minDistance));

        seedClone.style.left = left + "px";
        seedClone.style.top = top + "px";
        seedClone.classList.add(seedClasses[seedCountIndex]);
        container.appendChild(seedClone);
        seedPositions.push({ left, top });
      }
      seedCountIndex++;
    }
  }

  // Проверка валидности расположения семечек
  function isValidPosition(newLeft, newTop, minDistance) {
    for (const pos of seedPositions) {
      const distance = Math.sqrt((pos.left - newLeft) ** 2 + (pos.top - newTop) ** 2);
      if (distance < minDistance) {
        return false;
      }
    }
    return true;
  }

  // Инициализация семечек
  createAndDistributeSeeds();

  // Обновление расположения семечек при изменении размера окна
  window.addEventListener("resize", function() {
    createAndDistributeSeeds();
  });





   // ==   VIDEO YOUTUBE ON CLICK BUTTON ==================================================
   const videoYoutubeButtons = document.querySelectorAll('.video-youtube__button');
   videoYoutubeButtons.forEach(button => {
       button.addEventListener('click', function() {
           const youTubeCode = this.getAttribute('data-youtube');
           let autoplay = true; // Автоплей разрешено (true) или нет (false)
   
           let urlVideo = `https://www.youtube.com/embed/${youTubeCode}?rel=0&showinfo=0`;
   
           const iframe = document.createElement('iframe');
           iframe.setAttribute('allowfullscreen', '');
   
           if (autoplay) {
               urlVideo += '&autoplay=1';
               iframe.setAttribute('allow', 'autoplay; encrypted-media');
           }
   
           iframe.setAttribute('src', urlVideo);
   
           const body = this.closest('.video-youtube__body');
           body.innerHTML = '';
           body.appendChild(iframe);
           body.classList.add('video-added');
       });
   });
   // =====================================================================================
});

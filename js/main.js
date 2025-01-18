const MAX_BLOCKS = 7;
const btnAdd = document.querySelector('.btn__add');
const btnReset = document.querySelector('.btn__reset');
const blocks = document.querySelector('.blocks');
const span = document.querySelector('span');
const currentDate = new Date();
const months = ["Января", "Февраля", "Марта", "Апреля",
  "Мая", "Июня", "Июля", "Августа",
  "Сентября", "Октября", "Ноября", "Декабря"];
const day = currentDate.getDate();
const month = months[currentDate.getMonth()];
const year = currentDate.getFullYear();

span.innerHTML = `${day} ${month} ${year} года`;
// Шаблон для нового блока
const template = (id) => `
  <div class="block__week fadeIn" data-id="${id}">
    <form id="form">
      <input type="text" class="input inputField" placeholder="Введите что-нибудь" autocomplete="off">
    </form>
    <div class="checkboxes">
      <div class="box">
        <div class="box__title">пн</div>
        <div class="checkbox-wrapper">
          <input type="checkbox" class="checkbox" />
          <svg viewBox="0 0 35.6 35.6">
            <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
        </div>
      </div>
      <div class="box">
        <div class="box__title">вт</div>
        <div class="checkbox-wrapper">
          <input type="checkbox" class="checkbox" />
          <svg viewBox="0 0 35.6 35.6">
            <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
        </div>
      </div>
      <div class="box">
        <div class="box__title">ср</div>
        <div class="checkbox-wrapper">
          <input type="checkbox" class="checkbox" />
          <svg viewBox="0 0 35.6 35.6">
            <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
        </div>
      </div>
      <div class="box">
        <div class="box__title">чт</div>
        <div class="checkbox-wrapper">
          <input type="checkbox" class="checkbox" />
          <svg viewBox="0 0 35.6 35.6">
            <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
        </div>
      </div>
      <div class="box">
        <div class="box__title">пт</div>
        <div class="checkbox-wrapper">
          <input type="checkbox" class="checkbox" />
          <svg viewBox="0 0 35.6 35.6">
            <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
        </div>
      </div>
      <div class="box">
        <div class="box__title">сб</div>
        <div class="checkbox-wrapper">
          <input type="checkbox" class="checkbox" />
          <svg viewBox="0 0 35.6 35.6">
            <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
        </div>
      </div>
      <div class="box">
        <div class="box__title">вс</div>
        <div class="checkbox-wrapper">
          <input type="checkbox" class="checkbox" />
          <svg viewBox="0 0 35.6 35.6">
            <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
        </div>
      </div>
    </div>
  </div>`;

// Генерация уникального ID
const generateId = () => `block-${Date.now()}`;

// Сохранение состояния в LocalStorage
function saveToLocalStorage() {
  const blocksArray = [...blocks.children].map((block) => {
    const id = block.dataset.id;
    const inputField = block.querySelector('.inputField');
    const checkBoxes = [...block.querySelectorAll('.checkbox')];
    return {
      id,
      inputValue: inputField.value,
      checkBoxStates: checkBoxes.map((checkbox) => checkbox.checked),
    };
  });
  localStorage.setItem('blocksContent', JSON.stringify(blocksArray));
}

// Загрузка состояния из LocalStorage
function loadFromLocalStorage() {
  const savedBlocks = JSON.parse(localStorage.getItem('blocksContent') || '[]');
  savedBlocks.forEach(({ id, inputValue, checkBoxStates }) => {
    blocks.insertAdjacentHTML('beforeend', template(id));
    const block = blocks.querySelector(`[data-id="${id}"]`);
    block.querySelector('.inputField').value = inputValue;
    const checkBoxes = block.querySelectorAll('.checkbox');
    checkBoxes.forEach((checkbox, index) => {
      checkbox.checked = checkBoxStates[index] || false;
    });
  });
}

// Добавление нового блока
btnAdd.addEventListener('click', () => {

  if (blocks.children.length < MAX_BLOCKS) {
    const id = generateId();
    blocks.insertAdjacentHTML('beforeend', template(id));
    saveToLocalStorage();
    updateResetButtonState();
  } else {
    alert('Достигнут лимит блоков');
  }
});

function updateResetButtonState() {
  btnReset.disabled = !blocks.children.length;
}
// Очистка всех блоков
btnReset.addEventListener('click', () => {
  blocks.classList.add('fadeOut');
  setTimeout(() => {
    blocks.innerHTML = '';
    blocks.classList.remove('fadeOut');
    localStorage.removeItem('blocksContent');
    updateResetButtonState();
  }, 500);

});

// Делегирование событий
blocks.addEventListener('input', (event) => {
  if (event.target.matches('.inputField')) {
    event.target.classList.remove('error');
    saveToLocalStorage();
  }
});

blocks.addEventListener('change', (event) => {
  if (event.target.matches('.checkbox')) {
    const block = event.target.closest('.block__week');
    const inputField = block.querySelector('.inputField');
    if (inputField.value.trim() === '') {
      event.target.checked = false; // Отменяем выбор
      inputField.classList.add('error');
    }
    saveToLocalStorage();
  }
});

// Загрузка данных при старте
loadFromLocalStorage();
updateResetButtonState()


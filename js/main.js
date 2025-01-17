const btnAdd = document.querySelector('.btn__add');
const btnReset = document.querySelector('.btn__reset');
const blocks = document.querySelector('.blocks');
const dateSpan = document.querySelector('span');

const template = `
  <div class="block__week fadeIn">
            <form id="form">
              <input type="text" class="input inputField" placeholder="Введите что-нибудь">
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

function saveToLocalStorage() {
  const content = blocks.innerHTML;
  localStorage.setItem('blocksContent', content);
}

function loadFromLocalStorage() {
  const savedContent = localStorage.getItem('blocksContent');
  if (savedContent) {
    blocks.innerHTML = savedContent;
    addValidationToCheckBoxes();
  }
}

btnAdd.addEventListener('click', () => {
  blocks.insertAdjacentHTML('beforeend', template);
  addValidationToCheckBoxes();
  saveToLocalStorage();
});

btnReset.addEventListener('click', () => {
  blocks.classList.add('fadeOut');
  setTimeout(() => {
    blocks.innerHTML = '';
    localStorage.removeItem('blocksContent');
    blocks.classList.remove('fadeOut');
  }, 500);
});

function addValidationToCheckBoxes() {
  const allCheckBoxes = document.querySelectorAll('.checkbox');
  allCheckBoxes.forEach((checkbox) => {
    checkbox.addEventListener('click', (event) => {
      const parentInput = checkbox.closest('.block__week').querySelector('.inputField');
      if (parentInput && parentInput.value.trim() === '') {
        event.preventDefault();
        parentInput.classList.add('error');
      } else {
        parentInput.classList.remove('error');
      }
    });
  });

  const allInputs = document.querySelectorAll('.inputField');
  allInputs.forEach((input) => {
    input.addEventListener('focus', () => {
      input.classList.remove('error');
    });
  });
}

loadFromLocalStorage();

const currentDate = new Date();

const months = ["Января", "Февраля", "Марта", "Апреля",
  "Мая", "Июня", "Июля", "Августа",
  "Сентября", "Октября", "Ноября", "Декабря"];

const day = currentDate.getDate();
const month = months[currentDate.getMonth()];
const year = currentDate.getFullYear();

dateSpan.innerHTML = ` ${day} ${month} ${year} года`;



// получаем чекбоксы названий устройств

import Fetching from "../utils/fetchDataFromServer.js";
import GettingToAddButtons from "../basket/addToBasket.js";

const checkBoxes = document.querySelectorAll(".brand");

const parent = document.querySelector(".cards-wrapper");

// проверяем по какому индексу было выбрано устройство
checkBoxes.forEach((checker, index) => {
  checker.addEventListener("click", () => {
    // получаем объект для работы с запросами URL
    const params = new URLSearchParams(window.location.search);

    // если checkbox устанавливается в статус true, тогда заходим
    if (checker.checked) {
      // устанавливаем в стек запрос
      params.set(`brand${index}`, checker.name);

      // прописываем как он будет выглядить
      const newUrl = "?" + params.toString();

      // записываем его в историю
      history.pushState(null, null, newUrl);

      // получаем запрос данных по сслыке с запросами
      Fetching(
        `http://localhost:2005/filtered-phones${newUrl}`,
        parent,
        GettingToAddButtons
      );
    } else {
      // если же checkbox устанавливается в статус false, тогда крутимся и ищем ключ нашего выбранного параметра, чтобы удалить его из запроса
      for (const [key, value] of params.entries()) {
        if (value === checker.name) {
          // удаляем
          params.delete(`${key}`);

          // переписываем URL
          const newUrl = "?" + params.toString();

          // запоминаем
          history.pushState(null, null, newUrl);

          Fetching(
            `http://localhost:2005/filtered-phones${newUrl}`,
            parent,
            GettingToAddButtons
          );
        }
      }

      // если запросов нет, тогда возвращаем абсолютный адрес в стэк
      if (params.entries().next().done) {
        history.pushState(null, null, "/");
      }
    }
  });
});

// получаем радио-кнопки сортировки цены
const priceRanges = document.querySelectorAll(".price_range");

// отслеживаем нажатую кнопку - записываем его название в запрос URL
priceRanges.forEach((radio, index) => {
  radio.addEventListener("click", (event) => {
    const params = new URLSearchParams(window.location.search);

    params.set(`price_range`, radio.value);

    const newUrl = "?" + params.toString();

    history.pushState(null, null, newUrl);

    Fetching(
      `http://localhost:2005/filtered-phones${newUrl}`,
      parent,
      GettingToAddButtons
    );
  });
});

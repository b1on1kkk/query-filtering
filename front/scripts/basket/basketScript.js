// удаление элемента из корзины

export default function GettingToRemoveButtons(data) {
  // получаем кнопки
  const buttons = document.querySelectorAll("button");

  // смотрим на какую кнопку нажал пользователь
  buttons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      // запускаем таймер, который сработает на 500 мс для перезагрузки страницы (сделано чтобы видеть как удаляются элементы)
      setTimeout(() => {
        window.location.reload();
      }, 500);

      // отправляем запрос на удаление, передавая индекс
      fetch("/remove-from-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: data[index] }),
      });
    });
  });
}

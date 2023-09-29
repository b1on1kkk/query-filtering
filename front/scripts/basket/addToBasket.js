// добавление элементов в корзину

// получаем в параметре отфильтрованный, если фильтровали, массив
export default function GettingToAddButtons(data) {
  // получение кнопок
  const buttons = document.querySelectorAll(".btn");

  // слушаем кнопки
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // отсылаем все данные телефона
      fetch("/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: data[index] }),
      });
    });
  });
}

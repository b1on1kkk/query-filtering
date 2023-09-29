// функция получения данных

export default function Fetching(link, parent_block, buttons_function) {
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      // создаем строку из шаблона
      const structured_data = data
        .map((e) => {
          return `<div class = 'card-wrapper'>
                      <img src = ${e.picture}></img>
                      <div class = 'card-text-restaurant-wrapper'>
                          <h3>${e.title}</h3>
                          <h4>${e.price} руб.</h4>
                          <button type="button" class="btn btn-primary">Add to basket</button>
                      </div>
                  </div>`;
        })
        .join("");

      // удаляем то, что есть в блоке-родителе
      parent_block.innerHTML = "";
      // пихамем новые данные
      parent_block.innerHTML = structured_data;

      // передаем данные в другую функцию: функцию кнопок добавления/удаления товара в корзину/из корзины
      buttons_function(data);
    })
    .catch((err) => console.error(err));
}

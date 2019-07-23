const rawStyleText = `/* 
** Привет. Меня зовут Иван, я фронтенд-разработчик.
**
** Я подумал, что делать обычный сайт-визитку - как-то не интересно.
** Поэтому давайте напишем немного кода.
**
** Для начала анимируем... да вообще всё!
*/

* {
  transition: all 1s;
}

/* 
** Терпение... скоро станет понятно, зачем :)
*/

.App {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background: rgb(63, 82, 99);
  padding: 1%;
}

.Screen {
  color: white;

  /* 
  ** Ага, с белым цветом как-то попроще. Продолжаем.
  ** Нужно украсить рабочее место, а то грустно выглядит.
  */

  overflow: auto;
  box-sizing: border-box;
  background: rgb(48, 48, 48);
  border: 1px solid #ccc;
  font-family: monospace;
  padding: 10px 10px 20px;
  height: 97vh;
  width: 69%;
  box-shadow: -4px 4px 2px 0 rgba(0, 0, 0, 0.3);
  outline: 0;
}

/* 
** Так то получше будет. Вот только ослепительно белый цвет на чёрном
** фоне уже не модно, в крутых редакторах кода есть подсветка синтаксиса.
** Я тоже хочу. Минуточку...
*/

.comment {
  color: #43994c;
  font-style: italic;
}
.selector {
  color: #e69f0f;
}
.key {
  color: #64d5ea;
}
.value {
  color: #be84f2;
}

/* 
** Ну вот, так жить можно. Однако вы здесь наверное не для того чтобы
** наблюдать за раскраской сайта, а хотели обсудить какие-то важные вопросы.
** Сейчас сделаю меню с навигацией по сайту и моими контактами.
*/

.Sidebar {
  opacity: 1;
}

/*
** Чувствуйте себя как дома! :)
*/
`;

export default rawStyleText;

export default function getConsoleAnswer(incMessage) {
  let parsedInput = incMessage.split(" ");
  let command = parsedInput[0];
  switch (command) {
    case "help":
      return {
        author: "console",
        text: answers[command]
      };
    case "test":
      return {
        author: "console",
        text: answers[command]
      };
    default:
      return {
        author: "console",
        text:
          "Незнакомая команда, введите help чтобы получить информацию о доступных командах"
      };
  }
}

const help = `Доступные команды:
help : вывод списка доступных команд
test : тестовая команда`;
const test = `Тестовая команда работает`;

let answers = {
  help,
  test
};

export default function getConsoleAnswer(incMessage) {
  let parsedInput = incMessage.split(" ");
  switch (parsedInput[0]) {
    case "help":
      return {
        author: "console",
        text: answers[parsedInput[0]]
      };
    case "test":
      return {
        author: "console",
        text: answers[parsedInput[0]]
      };
    default:
      return {
        author: "console",
        text:
          "Незнакомая команда, введите help чтобы получить информацию о доступных командах"
      };
  }
}

let answers = {
  help: `Доступные команды: help, test`,
  test: `Тестовая команда работает`
};
// export default getConsoleAnswer;

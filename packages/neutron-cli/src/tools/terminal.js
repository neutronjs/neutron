const { print } = require('gluegun');

class MessageType {
  static get DEFAULT() {
    return 'DEFAULT';
  }

  static get SUCCESS() {
    return 'SUCCESS';
  }

  static get ERROR() {
    return 'ERROR';
  }

  static get INFO() {
    return 'INFO';
  }

  static get LIGHTER() {
    return 'LIGHTER';
  }
}

const PrintDivider = () => {
  print.divider();
};
const PrintNewLine = () => {
  print.newline();
};

/**
 * @param {string} message
 * @param {string} type
 * @param {Number} initialSpaces
 */
const PrintMessage = (
  message,
  type = MessageType.DEFAULT,
  initialSpaces = 0,
) => {
  const msg = `${' '.repeat(initialSpaces)}${message}`;

  switch (type) {
    case MessageType.ERROR:
      print.fancy(print.colors.red(msg));
      break;
    case MessageType.INFO:
      print.fancy(print.colors.cyan(msg));
      break;
    case MessageType.SUCCESS:
      print.fancy(print.colors.green(msg));
      break;
    case MessageType.LIGHTER:
      print.fancy(print.colors.grey(msg));
      break;
    default:
      print.info(msg);
  }
};

const PrintInvalidOperation = () => {
  PrintMessage(
    'The current path is not the root of a react project!',
    MessageType.ERROR,
  );
};

module.exports = {
  MessageType,
  PrintDivider,
  PrintNewLine,
  PrintMessage,
  PrintInvalidOperation,
};

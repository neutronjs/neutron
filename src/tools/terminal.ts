import { print } from "gluegun";

export enum MessageType {
  DEFAULT,
  SUCCESS,
  ERROR,
  INFO,
  LIGHTER
}

export const PrintDivider = () => {
  print.divider();
};
export const PrintNewLine = () => {
  print.newline();
};
export const PrintMessage = (
  msg: string,
  type: MessageType = MessageType.DEFAULT,
  initialSpaces: Number = 0
) => {
  let message = msg;

  for (let i = 0; i < initialSpaces; i++) {
    message = ` ${message}`;
  }

  switch (type) {
    case MessageType.ERROR:
      print.fancy(print.colors.red(message));
      break;
    case MessageType.INFO:
      print.fancy(print.colors.cyan(message));
      break;
    case MessageType.SUCCESS:
      print.fancy(print.colors.green(message));
      break;
    case MessageType.LIGHTER:
      print.fancy(print.colors.grey(message));
      break;
    default:
      print.info(message);
  }
};
export const PrintInvalidOperation = () => {
  PrintMessage(
    "The current path is not the root of a react project!",
    MessageType.ERROR
  );
};

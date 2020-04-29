export const ESC: string = "\x1b[";

export const CURSOR_UP: string = "A";
export const CURSOR_DOWN: string = "B";
export const CURSOR_RIGHT: string = "C";
export const CURSOR_LEFT: string = "D";
export const NEXT_LINE: string = "E";
export const PREV_LINE: string = "F";
export const CURSOR_MOVE_TO_X: string = "G";
export const CURSOR_MOVE_TO: string = "H";
export const CURSOR_REPORT_POS: string = "R";
export const SCROLL_UP: string = "S";
export const SCROLL_DOWN: string = "T";
export const CURSOR_SAVE_POS: string = "s";
export const CURSOR_RESTORE_POS: string = "u";
export const CURSOR_QUERY_POS: string = "6n";
export const CURSOR_HIDE: string = "?25l";
export const CURSOR_SHOW: string = "?25h";
export const ERASE_DOWN: string = "J";
export const ERASE_UP: string = "1J";
export const ERASE_SCREEN: string = "2J";
export const ERASE_END_LINE: string = "K";
export const ERASE_START_LINE: string = "1K";
export const ERASE_LINE: string = "2K";

export const FG_BLACK: string = "30m";
export const FG_RED: string = "31m";
export const FG_GREEN: string = "32m";
export const FG_YELLOW: string = "33m";
export const FG_BLUE: string = "34m";
export const FG_MAGENTA: string = "35m";
export const FG_CYAN: string = "36m";
export const FG_WHITE: string = "37m";
export const FG_RGB: string = "38;2;";
export const FG_CUSTOM: string = "38;5;";
export const FG_DEFAULT: string = "39m";

export const BG_BLACK: string = "40m";
export const BG_RED: string = "41m";
export const BG_GREEN: string = "42m";
export const BG_YELLOW: string = "43m";
export const BG_BLUE: string = "44m";
export const BG_MAGENTA: string = "45m";
export const BG_CYAN: string = "46m";
export const BG_WHITE: string = "47m";
export const BG_RGB: string = "48;2;";
export const BG_CUSTOM: string = "48;5;";
export const BG_DEFAULT: string = "49m";

export const FONT_BOLD: string = "1m";
export const FONT_LIGHT: string = "2m";
export const FONT_ITALIC: string = "3m";
export const FONT_UNDERLINED: string = "4m";
export const FONT_BLINK: string = "5m";
export const FONT_FAST_BLINK: string = "6m";
export const FONT_INVERSE: string = "7m";
export const FONT_HIDDEN: string = "8m";
export const FONT_STRIKETHROUGH: string = "9m";
export const FONT_BORDER: string = "51m";
export const FONT_ROUNDED_BORDER: string = "52m";
export const FONT_OVERLINE: string = "53m";

export const FONT_RESET: string = "0m";
export const FONT_END_BOLD: string = "21m";
export const FONT_END_LIGHT: string = "22m";
export const FONT_END_ITALIC: string = "23m";
export const FONT_END_UNDERLINED: string = "24m";
export const FONT_END_BLINK: string = "25m";
export const FONT_END_FAST_BLINK: string = "26m";
export const FONT_END_INVERSE: string = "27m";
export const FONT_END_HIDDEN: string = "28m";
export const FONT_END_STRIKETHROUGH: string = "29m";
export const FONT_END_BORDER: string = "54m";
export const FONT_END_OVERLINE: string = "54m";

export default class Ansi {
  private static _bg(color: string, str: string) {
    return `${Ansi.esc(color)}${str}${Ansi.bgReset}`;
  }

  private static _fg(color: string, str: string) {
    return `${Ansi.esc(color)}${str}${Ansi.fgReset}`;
  }

  public static get fgReset(): string {
    return Ansi.esc(FG_DEFAULT);
  }

  public static get bgReset(): string {
    return Ansi.esc(BG_DEFAULT);
  }

  public static esc(value: string) {
    return `${ESC}${value}`;
  }

  public static get startInverse(): string {
    return Ansi.esc(FONT_INVERSE);
  }

  public static get endInverse(): string {
    return Ansi.esc(FONT_END_INVERSE);
  }

  public static getArrayIfLineBreaks(
    content: string | string[]
  ): string | string[] {
    return typeof content === "string" && content.includes("\n")
      ? content.split("\n")
      : content;
  }

  public static getLongestLine(content: string[]): number {
    let longestLine: number = 0;
    content.forEach((line) => {
      if (line.length > longestLine) {
        longestLine = line.length;
      }
    });
    return longestLine;
  }

  public static write(...args: string[]) {
    args.forEach((arg) => {
      process.stdout.write(arg);
    });
  }

  public static writeLine(...args: string[]) {
    Ansi.write.apply(this, args.concat(["\n"]));
  }

  public static writeLines(...args: string[]) {
    args.forEach((arg) => {
      Ansi.writeLine(arg);
    });
  }

  public static cursorTo(x: number, y: number): string {
    if (typeof x !== "number") {
      throw new TypeError("The `x` argument is required");
    }
    if (typeof y !== "number") {
      return `${ESC}${x + 1}${CURSOR_MOVE_TO_X}`;
    }
    return `${ESC}${y + 1};${x + 1}${CURSOR_MOVE_TO}`;
  }

  public static cursorMove(x: number, y: number): string {
    return Ansi.cursorMoveX(x) + Ansi.cursorMoveY(y);
  }

  public static cursorMoveX(x: number): string {
    if (x < 0) {
      return `${ESC}${x * -1}${CURSOR_LEFT}`;
    } else if (x > 0) {
      return `${ESC}${x}${CURSOR_RIGHT}`;
    }
    return "";
  }

  public static cursorMoveY(y: number): string {
    if (y < 0) {
      return `${ESC}${y * -1}${CURSOR_UP}`;
    } else if (y > 0) {
      return `${ESC}${y}${CURSOR_DOWN}`;
    }
    return "";
  }

  public static cursorUp(n: number = 1): string {
    return `${ESC}${n}${CURSOR_UP}`;
  }

  public static cursorDown(n: number = 1): string {
    return `${ESC}${n}${CURSOR_DOWN}`;
  }

  public static cursorLeft(n: number = 1): string {
    return `${ESC}${n}${CURSOR_LEFT}`;
  }

  public static cursorRight(n: number = 1): string {
    return `${ESC}${n}${CURSOR_RIGHT}`;
  }

  public static cursorHome(): string {
    return `${ESC}${CURSOR_LEFT}`;
  }

  public static cursorPreviousLine(): string {
    return `${ESC}${PREV_LINE}`;
  }

  public static cursorNextLine(): string {
    return `${ESC}${NEXT_LINE}`;
  }

  public static cursorHide(): string {
    return `${ESC}${CURSOR_HIDE}`;
  }

  public static cursorShow(): string {
    return `${ESC}${CURSOR_SHOW}`;
  }

  public static cursorSavePosition(): string {
    return `${ESC}${CURSOR_SAVE_POS}`;
  }

  public static cursorRestorePosition(): string {
    return `${ESC}${CURSOR_RESTORE_POS}`;
  }

  public static cursorQueryPosition(): string {
    return `${ESC}${CURSOR_QUERY_POS}`;
  }

  public static eraseLine(): string {
    return `${ESC}${ERASE_LINE}`;
  }

  public static eraseLines(numLines: number) {
    let clear = "";
    for (let i = 0; i < numLines; i++) {
      clear += Ansi.eraseLine();
      if (i < numLines - 1) {
        clear += Ansi.cursorUp();
      }
    }
    return clear;
  }

  public static bold(str: string) {
    return `${ESC}${FONT_BOLD}${str}${ESC}${FONT_END_BOLD}`;
  }

  public static underlined(str: string) {
    return `${ESC}${FONT_UNDERLINED}${str}${ESC}${FONT_END_UNDERLINED}`;
  }

  public static italic(str: string) {
    return `${ESC}${FONT_ITALIC}${str}${ESC}${FONT_END_ITALIC}`;
  }

  public static light(str: string) {
    return `${ESC}${FONT_LIGHT}${str}${ESC}${FONT_END_LIGHT}`;
  }

  public static blink(str: string) {
    return `${ESC}${FONT_BLINK}${str}${ESC}${FONT_END_BLINK}`;
  }

  public static inverse(str: string) {
    return `${Ansi.startInverse}${str}${Ansi.endInverse}`;
  }

  public static border(str: string) {
    return `${ESC}${FONT_BORDER}${str}${ESC}${FONT_END_BORDER}`;
  }

  public static roundedBorder(str: string) {
    return `${ESC}${FONT_ROUNDED_BORDER}${str}${ESC}${FONT_END_BORDER}`;
  }

  public static strikethrough(str: string) {
    return `${ESC}${FONT_STRIKETHROUGH}${str}${ESC}${FONT_END_STRIKETHROUGH}`;
  }

  public static hidden(str: string) {
    return `${ESC}${FONT_HIDDEN}${str}${ESC}${FONT_END_HIDDEN}`;
  }

  public static center(
    content: string | string[],
    targetLength?: number,
    padChar: string = " "
  ): string {
    content = Ansi.getArrayIfLineBreaks(content);
    if (typeof content === "string") {
      const regex: RegExp = new RegExp(`${ESC}[^m]+m`, "g");
      const len: number = content.replace(regex, "").length;
      targetLength = targetLength || len;
      const padLeft: number = Math.max(0, Math.floor((targetLength - len) / 2));
      const padRight: number = Math.max(0, Math.ceil((targetLength - len) / 2));
      return `${padChar.repeat(padLeft)}${content}${padChar.repeat(padRight)}`;
    } else {
      targetLength = targetLength || Ansi.getLongestLine(content);
      content = content.map((line) => {
        return Ansi.center(line, targetLength, padChar);
      });
      return content.join("\n");
    }
  }

  public static left(
    content: string | string[],
    targetLength?: number,
    padChar: string = " "
  ): string {
    content = Ansi.getArrayIfLineBreaks(content);
    if (typeof content === "string") {
      const regex: RegExp = new RegExp(`${ESC}[^m]+m`, "g");
      const len: number = content.replace(regex, "").length;
      targetLength = targetLength || len;
      const padding: number = Math.max(targetLength - len, 1);
      return `${content}${padChar.repeat(padding)}`;
    } else {
      targetLength = targetLength || Ansi.getLongestLine(content);
      content = content.map((line) => {
        return Ansi.left(line, targetLength, padChar);
      });
      return content.join("\n");
    }
  }

  public static right(
    content: string | string[],
    targetLength?: number,
    padChar: string = " "
  ): string {
    content = Ansi.getArrayIfLineBreaks(content);
    if (typeof content === "string") {
      const regex: RegExp = new RegExp(`${ESC}[^m]+m`, "g");
      const len: number = content.replace(regex, "").length;
      targetLength = targetLength || len;
      const padding: number = targetLength - len;
      return `${padChar.repeat(padding)}${content}`;
    } else {
      targetLength = targetLength || Ansi.getLongestLine(content);
      content = content.map((line) => {
        return Ansi.right(line, targetLength, padChar);
      });
      return content.join("\n");
    }
  }

  public static highlight(str: string) {
    return Ansi.inverse(str);
  }

  public static bgBlue(str: string) {
    return Ansi._bg(BG_BLUE, str);
  }

  public static bgBlack(str: string) {
    return Ansi._bg(BG_BLACK, str);
  }

  public static bgCyan(str: string) {
    return Ansi._bg(BG_CYAN, str);
  }

  public static bgGreen(str: string) {
    return Ansi._bg(BG_GREEN, str);
  }

  public static bgMagenta(str: string) {
    return Ansi._bg(BG_MAGENTA, str);
  }

  public static bgRed(str: string) {
    return Ansi._bg(BG_RED, str);
  }

  public static bgWhite(str: string) {
    return Ansi._bg(BG_WHITE, str);
  }

  public static bgYellow(str: string) {
    return Ansi._bg(BG_YELLOW, str);
  }

  public static bgRgb(str: string, r: number, g: number, b: number): string;
  public static bgRgb(str: string, rgb: [number, number, number]): string;
  public static bgRgb(
    str: string,
    r: number | [number, number, number],
    g?: number,
    b?: number
  ) {
    if (typeof r !== "number") {
      return `${Ansi.startBgRgb(r)}${str}${Ansi.bgReset}`;
    } else {
      return `${Ansi.startBgRgb(r, g || 0, b || 0)}${str}${Ansi.bgReset}`;
    }
  }

  public static startBgRgb(r: number, g: number, b: number): string;
  public static startBgRgb(rgb: [number, number, number]): string;
  public static startBgRgb(
    r: number | [number, number, number],
    g?: number,
    b?: number
  ): string {
    if (g !== undefined) {
      return Ansi.esc(`${BG_RGB}${r};${g};${b}m`);
    } else {
      return Ansi.esc(`${BG_RGB}${r[0]};${r[1]};${r[2]}m`);
    }
  }

  public static bgCustom(str: string, colorNumber: number) {
    return `${ESC}${BG_CUSTOM}${colorNumber}m${str}${Ansi.bgReset}`;
  }

  public static fgBlue(str: string) {
    return Ansi._fg(FG_BLUE, str);
  }

  public static fgBlack(str: string) {
    return Ansi._fg(FG_BLACK, str);
  }

  public static fgCyan(str: string) {
    return Ansi._fg(FG_CYAN, str);
  }

  public static fgGreen(str: string) {
    return Ansi._fg(FG_GREEN, str);
  }

  public static fgMagenta(str: string) {
    return Ansi._fg(FG_MAGENTA, str);
  }

  public static fgRed(str: string) {
    return Ansi._fg(FG_RED, str);
  }

  public static fgWhite(str: string) {
    return Ansi._fg(FG_WHITE, str);
  }

  public static fgYellow(str: string) {
    return Ansi._fg(FG_YELLOW, str);
  }

  public static startFgRgb(r: number, g: number, b: number): string;
  public static startFgRgb(rgb: [number, number, number]): string;
  public static startFgRgb(
    r: [number, number, number] | number,
    g?: number,
    b?: number
  ): string {
    if (g !== undefined) {
      return Ansi.esc(`${FG_RGB}${r};${g};${b}m`);
    } else {
      return Ansi.esc(`${FG_RGB}${r[0]};${r[1]};${r[2]}m`);
    }
  }

  public static fgRgb(str: string, r: number, g: number, b: number): string;
  public static fgRgb(str: string, rgb: [number, number, number]): string;
  public static fgRgb(
    str: string,
    r: number | [number, number, number],
    g?: number,
    b?: number
  ) {
    if (typeof r !== "number") {
      return `${Ansi.startFgRgb(r)}${str}${Ansi.fgReset}`;
    } else {
      return `${Ansi.startFgRgb(r, g || 0, b || 0)}${str}${Ansi.fgReset}`;
    }
  }

  public static fgCustom(str: string, colorNumber: number) {
    return `${ESC}${FG_CUSTOM}${colorNumber}m${str}${Ansi.fgReset}`;
  }
}

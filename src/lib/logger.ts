import log from "loglevel";
import chalk from "chalk";
import prefix from "loglevel-plugin-prefix";

const colours = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
};
type ObjectKey = keyof typeof colours;

if (process.env.NODE_ENV == "development") {
  log.setLevel("debug");
}

prefix.reg(log);

prefix.apply(log, {
  format(level, name, timestamp) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${chalk.gray(`[${timestamp}]`)} ${colours[
      level.toUpperCase() as ObjectKey
    ](level)} ${chalk.green(`${name}:`)}`;
  },
});

export { log as logger };

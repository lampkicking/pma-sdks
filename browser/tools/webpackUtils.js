import internalIp from "internal-ip";
import chalk from "chalk";

let isProd = process.env.NODE_ENV === 'production';

let emptyPlugin = () => {};

function itemsAreNotNull (item) {
  return item !== null;
}

let logNetworkIp = (port) => {
  internalIp
    .v4()
    .then((ip) => {
      console.log(
        chalk.blue(`ℹ `) +
        chalk.gray(`｢wds｣`) +
        `: Use the same ` +
        chalk.bold(`wifi network `) +
        `to load the app on any device at ` +
        chalk.bold.blue(`https://${ip}:${port}/`)
      );
    });
}

export {
  isProd,
  emptyPlugin,
  itemsAreNotNull,
  logNetworkIp
};

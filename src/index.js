const log = console.log;
import path from "path";
import is from "@sindresorhus/is";
import pkgUp from "pkg-up";
import fs from "fs-extra";
import chalk from "chalk";
import { printLine, printMirror } from "tacker";

//TODO: Change call order (szProperty first since pkg is optional)
export default function getPkgProp(pkg, szProperty) {
  let sourceType = is(szProperty);
  switch (sourceType) {
    case "undefined":
      handleUndefined(szProperty);
      break;
    case "string":
      handleString(pkg, szProperty);
      break;
    case "Object":
      handleObject(pkg, szProperty);
      break;
    default:
      return `${chalk.yellow(
        "printVersion"
      )} doesn't recognize the param type. \nAccepted argument types: null, pkgPath<sz>, pkgObject<JSON>`;
  }
}

export async function handleUndefined(szProperty) {
  let pkgPath;
  try {
    pkgPath = await pkgUp();
  } catch (err) {
    handleError("handleUndefined", err, "pkgUp failed");
  }
  return handleString(pkgPath, szProperty);
}

export async function handleString(szPkgPath, szProperty) {
  let pkgJSON,
    pkgPath = szPkgPath;
  if (!pkgPath.endsWith("package.json")) {
    pkgPath = path.join(pkgPath, "/package.json");
  }
  try {
    pkgJSON = await fs.readJson(pkgPath);
  } catch (err) {
    handleError("handleString", err, "readJson failed");
  }
  //TODO: check if pkgPath exists
  //TODO: add path-exists
  return handleObject(pkgJSON, szProperty);
}

export function handleObject(pkgJSON, szProperty) {
  let propValue;
  if (pkgJSON.hasOwnProperty(szProperty) === false) {
    handleError("handleObject");
  }
  Object.entries(pkgJSON).map(([key, val]) => {
    if (key === szProperty) {
      propValue = val;
    }
  });
  // printLine("blue");
  // printMirror({ propValue }, "blue", "grey");
  // printLine("blue");
  return propValue;
}

export function handleError(szFnName, szCustomErr, szErr) {
  //TODO: Add initial undefined & emptyString check. Then concat all instead of piecemeal
  printLine("red");
  if (!is.undefined(szFnName)) {
    log(`${chalk.red(szFnName)}`);
  }
  if (!is.undefined(szErr)) {
    printLine({ character: ".", color: "grey" });
    log(`${chalk.grey(szErr)}`);
    printLine({ character: ".", color: "grey" });
  }
  if (!is.undefined(szCustomErr)) {
    log(`${chalk.red(szCustomErr)}`);
  }
  printLine("red");
}

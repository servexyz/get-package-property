const log = console.log;
import path from "path";
import is from "@sindresorhus/is";
import pkgUp from "pkg-up";
import fs from "fs-extra";
import chalk from "chalk";
import { printLine, printMirror } from "tacker";

export function getPkgProp(szProperty, pkg) {
  let sourceType = is(szProperty);
  switch (sourceType) {
    case "undefined":
      return handleUndefined(szProperty);
    case "string":
      return handleString(pkg, szProperty);
    case "Object":
      return handleObject(pkg, szProperty);
    default:
      handleError("printVersion", "Unrecognized argument type");
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

//TODO: Change call order to match getPkgProp
export async function handleString(szPkgPath = process.cwd(), szProperty) {
  let pkgJSON,
    pkgPath = szPkgPath;
  if (!pkgPath.endsWith("package.json")) {
    pkgPath = path.resolve(pkgPath, "package.json");
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

//TODO: Change call order to match getPkgProp
export async function handleObject(pkgJSON, szProperty) {
  let propValue;
  printMirror({ pkgJSON }, "cyan", "grey");
  if (is.object(pkgJSON)) {
    if (pkgJSON.hasOwnProperty(szProperty) === false) {
      handleError("handleObject", "property not found");
    } else {
      Object.entries(pkgJSON).map(([key, val]) => {
        if (key === szProperty) {
          propValue = val;
        }
      });
    }
  } // printLine("blue");
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

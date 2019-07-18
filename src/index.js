import is from "@sindresorhus/is";
import pkgUp from "pkg-up";
import fs from "fs-extra";
import isPathInside from "is-path-inside";
import chalk from "chalk";
import { printLine } from "tacker";

export default function getPackageProperty(package, szNameOfProperty) {
  let sourceType = is(szNameOfProperty);
  switch (sourceType) {
    case "undefined":
      handleUndefined(szNameOfProperty);
      break;
    case "string":
      handleString(package, szNameOfProperty);
      break;
    case "Object":
      handleObject(package, szNameOfProperty);
      break;
    default:
      return `${chalk.blue(
        "printVersion"
      )} doesn't recognize the param type. \nAccepted argument types: null, packagePath<sz>, packageObject<JSON>`;
  }
}

export async function handleUndefined(szNameOfProperty) {
  let pkgPath;
  try {
    pkgPath = await pkgUp();
  } catch (err) {
    handleError("handleUndefined", err, "pkgUp failed");
  }
  handleString(pkgPath, szNameOfProperty);
}
export async function handleString(packagePath, szNameOfProperty) {
  let pathToParse, pkgJSON;
  if (!isPathInside("package.json", packagePath)) {
    pathToParse += "package.json";
  }
  try {
    pkgJSON = await fs.readJson(pathToParse);
  } catch (err) {
    handleError("handleString", err, "readJson failed");
  }
  //TODO: check if pathToParse exists
  //TODO: add path-exists
  handleObject(pkgJSON, szNameOfProperty);
}
export function handleObject(packageJSON, szNameOfProperty) {
  let propValue;
  if (!packageJSON.hasOwnProperty(szNameOfProperty)) {
    handleError("handleObject");
  }
  Object.entries(packageJSON).map(([key, val]) => {
    if (key === szNameOfProperty) propValue = val;
  });
  if (!is.undefined(propValue)) {
    return propValue;
  } else {
    handleError("handleObject");
  }
  //TODO: Brainstorm using szNameOfProperty in object destructuring
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

import is from "@sindresorhus/is";
import readPkg from "read-pkg";
import pkgUp from "pkg-up";
import isPathInside from "is-path-inside";
import { printLine } from "tacker";
import fs from "fs-extra";
import chalk from "chalk";

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

async function handleUndefined(szNameOfProperty) {
  let pkgPath;
  try {
    pkgPath = await pkgUp();
  } catch (err) {
    handleError("handleUndefined", err, "readPkgUp failed");
  }
  handleString(pkgPath, szNameOfProperty);
}
async function handleString(packagePath, szNameOfProperty) {
  let pathToParse, pkgJSON;
  if (!isPathInside("package.json", packagePath)) {
    pathToParse += "package.json";
  }
  try {
    pkgJSON = await fs.readJson(pathToParse);
  } catch (err) {
    handleError("handleString", err, "fs.readJson failed");
  }
  //TODO: check if pathToParse exists
  //TODO: add path-exists
  handleObject(pkgJSON, szNameOfProperty);
}
function handleObject(packageJSON, szNameOfProperty) {
  if (!packageJSON.hasOwnProperty(szNameOfProperty)) {
    handleError("handleObject");
  }
  //TODO: Brainstorm using szNameOfProperty in object destructuring
}
function handleError(szFnName, szErr, szCustomErr) {
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

// export function getPackageProperty(package, szNameOfProperty) {
//   let packageJSON;
//   let sourceType = is(package);
//   if (sourceType === "undefined") {

//   } else if (sourceType === "string") {

//   } else if (sourceType === "Object") {
//   }
// }

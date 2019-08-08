const log = console.log;
import path from "path";
import is from "@sindresorhus/is";
import pkgUp from "pkg-up";
import fs from "fs-extra";
import chalk from "chalk";
import { printLine, printMirror } from "tacker";

//TODO: Add option object which will accept handleError args
export function getPkgProp(szProperty, pkg) {
  if (is.nullOrUndefined(szProperty)) return null;
  let sourceType = is(pkg);
  try {
    switch (sourceType) {
      case "undefined":
        return handleUndefined(szProperty);
      case "string":
        return handleString(szProperty, pkg);
      case "Object":
        return handleObject(szProperty, pkg);
      default:
        return handleError(true, {
          fn: "getPkgProp",
          message: "Unrecognized argument type"
        });
    }
  } catch (err) {
    return handleError(true, {
      fn: "getPkgProp",
      message: "handler failed",
      err
    });
  }
}

export async function handleUndefined(szProperty) {
  if (is.nullOrUndefined(szProperty)) return null;
  let pkgPath;
  try {
    pkgPath = await pkgUp();
  } catch (err) {
    handleError(true, { fn: "handleUndefined", err, message: "pkgUp failed" });
  }
  return handleString(szProperty, pkgPath);
}

export async function handleString(szProperty, szPkgPath = process.cwd()) {
  if (is.nullOrUndefined(szProperty)) return null;
  let pkgJSON,
    pkgPath = szPkgPath;
  if (pkgPath.endsWith("package.json") === false) {
    pkgPath = path.resolve(pkgPath, "package.json");
  }
  try {
    pkgJSON = await fs.readJson(pkgPath);
  } catch (err) {
    return handleError(true, {
      fn: "handleString",
      err,
      message: "readJson failed"
    });
  }
  //TODO: check if pkgPath exists
  //TODO: add path-exists
  return handleObject(szProperty, pkgJSON);
}

export async function handleObject(szProperty, oPkgJSON) {
  if (is.nullOrUndefined(szProperty)) return null;
  let propValue;
  let pkgJSON = oPkgJSON;
  if (is.object(pkgJSON)) {
    if (pkgJSON.hasOwnProperty(szProperty) === false) {
      return handleError(true, {
        fn: "handleObject",
        message: "property not found"
      });
    } else {
      //? Feel like there's a better way to grab this value than iterating
      Object.entries(pkgJSON).map(([key, val]) => {
        if (key === szProperty) {
          propValue = val;
        }
      });
    }
  }
  return propValue;
}

export function handleError(bFlag = true, oOptions) {
  if (is.truthy(bFlag) && is.truthy(oOptions)) {
    let { fn, err, message } = oOptions;
    if (fn)
      //TODO: Move to tacker
      //TODO: Add initial undefined & emptyString check. Then concat all instead of piecemeal
      printLine("red");
    if (!is.undefined(fn)) {
      log(`${chalk.red(fn)}`);
    }
    if (!is.undefined(err)) {
      printLine({ character: ".", color: "grey" });
      log(`${chalk.red(err)}`);
      printLine({ character: ".", color: "grey" });
    }
    if (!is.undefined(message)) {
      log(`${chalk.grey(message)}`);
    }
    printLine("red");
  }
  return false;
}

export async function getPkgUpJSON() {
  let pkgPath = await pkgUp();
  return await fs.readJson(pkgPath);
}

// function initTest() {
//   let lgPath = path.resolve(process.cwd(), "sandbox", "library-genesis");
//   (async () => {
//     let x = await handleUndefined("name"); //
//     printMirror({ x }, "magenta", "grey");

//     let lgObj = await fs.readJson(path.join(lgPath, "package.json"));
//     let y = await handleString("name", lgPath);
//     let z = await handleObject("name", lgObj);
//     printMirror({ y }, "magenta", "grey");
//     printMirror({ z }, "magenta", "grey");
//     // x;
//     // y;
//     let a = await getPkgProp("name");
//     let b = await getPkgProp("name", lgPath);
//     let c = await getPkgProp("name", lgObj);
//     //   a;
//     //   b;
//     //   c;
//   })();
// }
// initTest()

const log = console.log;
import test from "ava";
import chalk from "chalk";
import {
  getPkgUpJSON,
  handleUndefined,
  handleString,
  handleObject,
  getPkgProp
} from "../src/index";
import { printMirror, printLine } from "tacker";
const { name } = require("../package.json");

test(`${chalk.cyan("handleUndefined")} gets package from ${chalk.cyan(
  "get-pkg-prop"
)}`, async t => {
  let shouldBeName = await handleUndefined("name");
  t.is(name, shouldBeName);
});

test(`${chalk.cyan("handleString")} gets package from ${chalk.cyan(
  "get-pkg-prop"
)}`, async t => {
  t.plan(2);
  let dir = process.cwd();
  let shouldBeNameOne = await handleString("name", dir);
  let shouldBeNameTwo = await handleString("name", dir);
  t.is(name, shouldBeNameOne);
  t.is(name, shouldBeNameTwo);
});

test(`${chalk.cyan("handleObject")} gets package from ${chalk.cyan(
  "get-pkg-prop"
)}`, async t => {
  let pkgJSON = await getPkgUpJSON();
  let shouldBeName = await handleObject("name", pkgJSON);
  t.is(name, shouldBeName);
});

test(`${chalk.cyan("getPkgProp")} parses ${chalk.underline(
  "<undefined>"
)} correctly and returns value`, async t => {
  let shouldBeName = await getPkgProp("name");
  t.is(name, shouldBeName);
});

test(`${chalk.cyan("getPkgProp")} parses ${chalk.underline(
  "<string>"
)} correctly and returns value`, async t => {
  let dir = process.cwd();
  let shouldBeName = await getPkgProp("name", dir);
  t.is(name, shouldBeName);
});

test(`${chalk.cyan("getPkgProp")} parses ${chalk.underline(
  "<object>"
)} correctly and returns value`, async t => {
  let pkgJSON = await getPkgUpJSON();
  let shouldBeName = await getPkgProp("name", pkgJSON);
  t.is(name, shouldBeName);
});

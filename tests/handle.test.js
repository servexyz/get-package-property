const log = console.log;
import test from "ava";
import chalk from "chalk";
import is from "@sindresorhus/is";
import {
  getPkgUpJSON,
  handleError,
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

test(`${chalk.cyan(
  "getPkgProp"
)} returns null if szProperty isn't defined for all handlers`, async t => {
  t.plan(5);
  t.true(is.nullOrUndefined(getPkgProp()));
  t.true(is.nullOrUndefined(await handleUndefined()));
  t.false(is.nullOrUndefined(await handleUndefined("name")));
  t.true(is.nullOrUndefined(await handleString()));
  t.true(is.nullOrUndefined(await handleObject()));
});

test(`${chalk.cyan("handleError")} returns false`, t => {
  t.false(handleError(false));
});

test(`${chalk.cyan(
  "getPkgProp"
)} returns undefined when trying to grab ${chalk.underline(
  "xyz"
)} property`, async t => {
  t.true(is.nullOrUndefined(await getPkgProp("xyz")));
});

test(`${chalk.cyan("getPkgProp")} returns an ${chalk.underline(
  "object"
)}`, async t => {
  const expectedRepoProp = {
    type: "git",
    url: "https://github.com/servexyz/get-pkg-prop"
  };
  t.deepEqual(await getPkgProp("repository"), expectedRepoProp);
});

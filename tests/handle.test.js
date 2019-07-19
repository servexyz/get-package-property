import test from "ava";
import {
  getPkgUpJSON,
  handleUndefined,
  handleString,
  handleObject,
  getPkgProp
} from "../src/index";
import { printMirror, printLine } from "tacker";

const { name } = require("../package.json");
test("handleUndefined gets package from get-pkg-prop", async t => {
  let shouldBeName = await handleUndefined("name");
  // printMirror({ shouldBeName }, "green", "grey");
  t.is(name, shouldBeName);
});

test("handleString gets package from get-pkg-prop", async t => {
  t.plan(2);
  let dir = process.cwd();
  // let dir = path.join(__dirname, "../");
  printMirror({ dir }, "blue", "grey");
  let shouldBeNameOne = await handleString("name", dir);
  // printMirror({ shouldBeNameOne }, "blue", "grey");
  t.is(name, shouldBeNameOne);
  let shouldBeNameTwo = await handleString("name", dir);
  // printMirror({ shouldBeNameTwo }, "blue", "grey");
  t.is(name, shouldBeNameTwo);
});

test("handleObject gets package from get-pkg-prop", async t => {
  // let pkgPath = await pkgUp();
  // let pkgJSON = await fs.readJson(pkgPath);
  let pkgJSON = await getPkgUpJSON();
  let shouldBeName = await handleObject("name", pkgJSON);
  t.is(name, shouldBeName);
});

test("getPkgProp parses <undefined> correctly and returns value", async t => {
  let shouldBeName = getPkgProp("name");
  t.is(name, shouldBeName);
});

test("getPkgProp parses <string> correctly and returns value", async t => {
  let dir = process.cwd();
  let shouldBeName = getPkgProp("name", dir);
  t.is(name, shouldBeName);
});

test.skip("getPkgProp parses <object> correctly and returns value", async t => {
  let pkgJSON = await getPkgUpJSON();
  let shouldBeName = getPkgProp("name", pkgJSON);
  printMirror({ shouldBeName });
  t.is(name, shouldBeName);
});

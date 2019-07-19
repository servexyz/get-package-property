import test from "ava";
import {
  handleUndefined,
  handleString,
  handleObject,
  getPkgProp
} from "../src/index";
import { printMirror, printLine } from "tacker";
import readPkgUp from "read-pkg-up";
import path from "path";

const { name } = require("../package.json");
test("handleUndefined gets package from get-pkg-prop", async t => {
  let shouldBeName = await handleUndefined("name");
  // printMirror({ shouldBeName }, "green", "grey");
  t.is(name, shouldBeName);
});

test("handleString gets package from get-pkg-prop", async t => {
  t.plan(2);
  // let dir = process.cwd();
  let dir = path.join(__dirname, "../");
  printMirror({ dir }, "blue", "grey");
  let shouldBeNameOne = await handleString(dir, "name");
  // printMirror({ shouldBeNameOne }, "blue", "grey");
  t.is(name, shouldBeNameOne);
  let shouldBeNameTwo = await handleString(
    "/Users/alechp/Code/servexyz/get-pkg-prop/package.json",
    "name"
  );
  // printMirror({ shouldBeNameTwo }, "blue", "grey");
  t.is(name, shouldBeNameTwo);
});

test.skip("handleObject gets package from get-pkg-prop", async t => {
  let pkgJSON = await readPkgUp();
  printMirror({ pkgJSON }, "magenta", "grey");
  let shouldBeName = await handleObject(pkgJSON, "name");
  t.is(name, shouldBeName);
});

test.skip("getPkgProp parses undefined correctly and returns value", t => {
  let shouldBeName = getPkgProp("name");
  t.is(name, shouldBeName);
});

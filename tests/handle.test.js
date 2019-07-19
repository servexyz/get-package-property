import test from "ava";
import {
  getPackageProperty,
  handleUndefined,
  handleString,
  handleObject
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
  let shouldBeNameOne = await handleString(
    "/Users/alechp/Code/servexyz/get-pkg-prop",
    "name"
  );
  // printMirror({ shouldBeNameOne }, "blue", "grey");
  t.is(name, shouldBeNameOne);
  let shouldBeNameTwo = await handleString(
    "/Users/alechp/Code/servexyz/get-pkg-prop/package.json",
    "name"
  );
  // printMirror({ shouldBeNameTwo }, "blue", "grey");
  t.is(name, shouldBeNameTwo);
});

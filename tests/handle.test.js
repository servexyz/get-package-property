import test from "ava";
import {
  getPackageProperty,
  handleUndefined,
  handleString,
  handleObject
} from "../src/index";
import { printMirror } from "tacker";

const { name } = require("../package.json");
test("handleUndefined gets package from get-pkg-prop", async t => {
  let shouldBeName = await handleUndefined("name");
  printMirror({ shouldBeName }, "blue", "grey");
  t.is(name, shouldBeName);
});

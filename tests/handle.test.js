import test from "ava";
import {
  getPackageProperty,
  handleUndefined,
  handleString,
  handleObject
} from "../src/index";

test("handleUndefined gets package from get-pkg-prop", t => {
  handleUndefined();
});

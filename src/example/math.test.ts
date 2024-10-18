import assert from "node:assert";
import { describe, it } from "node:test";

import { add } from "./math";

describe("math", () => {
  it("add 1 and 2, should be 3", () => {
    const result = add(1, 2);
    assert.equal(result, 3);
  });
});

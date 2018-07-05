import "should";
import "mocha";
import * as expr from "../";

const shouldLib = require("should");

describe("", () => {
  it("evals the first matching expression", () => {
    const result = expr.first([[() => false, () => 1], [() => true, () => 2]]);
    shouldLib.exist(result);
    result && result.should.equal(2);
  });

  it("async evals the first matching expression", async () => {
    const result = await expr.first([
      [() => false, async () => await Promise.resolve(1)],
      [() => true, async () => await Promise.resolve(2)]
    ]);
    shouldLib.exist(result);
    result && result.should.equal(2);
  });

  it("collects matching expressions", () => {
    const results = expr.collect([
      [() => false, () => 1],
      [() => true, () => 2],
      [() => true, () => 3]
    ]);
    results.should.deepEqual([2, 3]);
  });

  it("async evals the first matching expression", async () => {
    const results = await expr.collectAsync([
      [() => false, async () => await Promise.resolve(1)],
      [() => true, async () => await Promise.resolve(2)],
      [() => true, async () => await Promise.resolve(3)]
    ]);
    results.should.deepEqual([2, 3]);
  });
});

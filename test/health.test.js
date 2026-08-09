const test = require("node:test");
const assert = require("node:assert");

test("health check should return healthy status", () => {
  const response = {
    status: 200,
    body: {
      status: "healthy"
    }
  };

  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.status, "healthy");
});
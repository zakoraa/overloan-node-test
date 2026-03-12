// src/tests/stress.test.ts
import { check, sleep } from "k6";

// src/rpc.ts
import http from "k6/http";

// src/config.ts
var RPC_URL = __ENV.RPC_URL || "http://localhost:26657";

// src/rpc.ts
function getBlock() {
  return http.get(`${RPC_URL}/block`);
}

// src/tests/stress.test.ts
var options = {
  stages: [
    { duration: "2m", target: 100 },
    { duration: "2m", target: 500 },
    { duration: "2m", target: 1e3 },
    { duration: "2m", target: 2e3 }
  ]
};
function stress_test_default() {
  const res = getBlock();
  check(res, {
    "status is 200": (r) => r.status === 200
  });
  sleep(0.5);
}
export {
  stress_test_default as default,
  options
};

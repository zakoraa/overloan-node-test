// src/tests/spike.test.ts
import { check, sleep } from "k6";

// src/rpc.ts
import http from "k6/http";

// src/config.ts
var RPC_URL = __ENV.RPC_URL || "http://localhost:26657";

// src/rpc.ts
function getStatus() {
  return http.get(`${RPC_URL}/status`);
}

// src/tests/spike.test.ts
var options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "10s", target: 2e3 },
    { duration: "1m", target: 2e3 },
    { duration: "30s", target: 50 }
  ]
};
function spike_test_default() {
  const res = getStatus();
  check(res, {
    "status is 200": (r) => r.status === 200
  });
  sleep(1);
}
export {
  spike_test_default as default,
  options
};

// src/tests/load.test.ts
import { check, sleep } from "k6";

// src/rpc.ts
import http from "k6/http";

// src/config.ts
var RPC_URL = __ENV.RPC_URL || "http://localhost:26657";

// src/rpc.ts
function getStatus() {
  return http.get(`${RPC_URL}/status`);
}

// src/tests/load.test.ts
var options = {
  vus: 100,
  duration: "5m"
};
function load_test_default() {
  const res = getStatus();
  check(res, {
    "status is 200": (r) => r.status === 200
  });
  sleep(1);
}
export {
  load_test_default as default,
  options
};

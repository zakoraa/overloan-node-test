// src/tests/soak.test.ts
import { check, sleep } from "k6";

// src/rpc.ts
import http from "k6/http";

// src/config.ts
var RPC_URL = __ENV.RPC_URL || "http://localhost:26657";

// src/rpc.ts
function getNetInfo() {
  return http.get(`${RPC_URL}/net_info`);
}

// src/tests/soak.test.ts
var options = {
  vus: 200,
  duration: "24h"
};
function soak_test_default() {
  const res = getNetInfo();
  check(res, {
    "status is 200": (r) => r.status === 200
  });
  sleep(1);
}
export {
  soak_test_default as default,
  options
};

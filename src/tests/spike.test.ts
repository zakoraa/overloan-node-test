import { check, sleep } from "k6";
import { randomEndpoint } from "../rpc/endpoints";

// Prod version
// export const options = {
//   stages: [
//     { duration: "1m", target: 100 },
//     { duration: "5s", target: 1000 },
//     { duration: "2m", target: 1000 },
//     { duration: "5s", target: 2000 },
//     { duration: "2m", target: 2000 },
//     { duration: "1m", target: 100 }
//   ],

//   gracefulStop: "60s",

//   thresholds: {
//     http_req_failed: ["rate<0.1"]
//   }
// }

// Dev version
export const options = {
  stages: [
    { duration: "1m", target: 50 },
    { duration: "10s", target: 300 },
    { duration: "1m", target: 300 },
    { duration: "10s", target: 600 },
    { duration: "1m", target: 600 },
    { duration: "30s", target: 0 }
  ],

  gracefulStop: "30s",

  thresholds: {
    http_req_failed: ["rate<0.2"]
  }
}

export default function () {
  const res = randomEndpoint()();

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}

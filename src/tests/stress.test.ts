import { check, sleep } from "k6";
import { randomEndpoint } from "../rpc/endpoints";

// Prod Version
// export const options = {
//   stages: [
//     { duration: "3m", target: 100 },
//     { duration: "3m", target: 300 },
//     { duration: "3m", target: 600 },
//     { duration: "3m", target: 1000 },
//     { duration: "3m", target: 1500 },
//     { duration: "3m", target: 2000 },
//     { duration: "2m", target: 0 }
//   ],

//   gracefulStop: "60s",

//   thresholds: {
//     http_req_failed: ["rate<0.1"],
//     http_req_duration: ["p(95)<1500"]
//   }
// }

// Dev version
export const options = {
  stages: [
    { duration: "1m", target: 50 },
    { duration: "1m", target: 150 },
    { duration: "1m", target: 300 },
    { duration: "1m", target: 500 },
    { duration: "30s", target: 0 }
  ],

  gracefulStop: "30s",

  thresholds: {
    http_req_failed: ["rate<0.1"],
    http_req_duration: ["p(95)<1500"]
  }
}

export default function () {
  const res = randomEndpoint()();

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}

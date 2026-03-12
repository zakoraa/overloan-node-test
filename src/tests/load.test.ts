import { check, sleep } from "k6";
import { randomEndpoint } from "../rpc/endpoints";

// Prod Version
// export const options = {
//   stages: [
//     { duration: "5m", target: 200 },
//     { duration: "10m", target: 500 },
//     { duration: "10m", target: 800 },
//     { duration: "5m", target: 1000 },
//     { duration: "5m", target: 0 }
//   ],

//   gracefulStop: "60s",

//   thresholds: {
//     http_req_failed: ["rate<0.01"],
//     http_req_duration: ["p(95)<800"]
//   }
// }

// Dev Version
export const options = {
  stages: [
    { duration: "1m", target: 50 },
    { duration: "2m", target: 150 },
    { duration: "2m", target: 300 },
    { duration: "1m", target: 0 }
  ],

  gracefulStop: "30s",

  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"]
  }
}


export default function () {
  const res = randomEndpoint()();

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}

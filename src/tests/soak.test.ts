import { check, sleep } from "k6"
import { randomEndpoint } from "../rpc/endpoints"

// Prod Version
// export const options = {
//   vus: 200,
//   duration: "6h",

//   gracefulStop: "60s",

//   thresholds: {
//     http_req_failed: ["rate<0.02"],
//     http_req_duration: ["p(95)<1000"]
//   }
// }

// Dev Version
export const options = {
  vus: 200,
  duration: "10m",

  gracefulStop: "30s",

  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"]
  }
}

export default function () {

  const res = randomEndpoint()()

  check(res, {
    "status is 200": (r) => r.status === 200
  })

  sleep(1)
}
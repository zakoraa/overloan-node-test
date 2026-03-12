import http from "k6/http"
import { check, sleep } from "k6"
import { RPC_URL } from "../config"


export const options = {
  stages: [
    { duration: "1m", target: 50 },
    { duration: "10s", target: 2000 },
    { duration: "2m", target: 2000 },
    { duration: "30s", target: 50 }
  ],
  thresholds: {
    http_req_failed: ["rate<0.1"]
  }
}

export default function () {

  const res = http.get(`${RPC_URL}/block`)

  check(res, {
    "status is 200": (r) => r.status === 200
  })

  sleep(1)
}
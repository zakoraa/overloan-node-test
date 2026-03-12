import http from "k6/http"
import { check, sleep } from "k6"
import { RPC_URL } from "../config"


const endpoints = [
  () => http.get(`${RPC_URL}/status`),
  () => http.get(`${RPC_URL}/block`),
  () => http.get(`${RPC_URL}/validators`),
  () => http.get(`${RPC_URL}/net_info`)
]

export const options = {
  stages: [
    { duration: "2m", target: 100 },
    { duration: "3m", target: 300 },
    { duration: "3m", target: 500 }
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"]
  }
}

export default function () {

  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)]
  const res = endpoint()

  check(res, {
    "status is 200": (r) => r.status === 200
  })

  sleep(1)
}
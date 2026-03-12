import { check, sleep } from "k6"
import { Options } from "k6/options"
import { getStatus } from "../rpc"

export const options: Options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "10s", target: 2000 },
    { duration: "1m", target: 2000 },
    { duration: "30s", target: 50 }
  ]
}

export default function () {
  const res = getStatus()

  check(res, {
    "status is 200": (r) => r.status === 200
  })

  sleep(1)
}
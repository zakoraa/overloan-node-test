import { check, sleep } from "k6"
import { Options } from "k6/options"
import { getStatus } from "../rpc"

export const options: Options = {
  vus: 100,
  duration: "5m"
}

export default function () {
  const res = getStatus()

  check(res, {
    "status is 200": (r) => r.status === 200
  })

  sleep(1)
}
import { check, sleep } from "k6"
import { Options } from "k6/options"
import { getBlock } from "../rpc"

export const options: Options = {
  stages: [
    { duration: "2m", target: 100 },
    { duration: "2m", target: 500 },
    { duration: "2m", target: 1000 },
    { duration: "2m", target: 2000 }
  ]
}

export default function () {
  const res = getBlock()

  check(res, {
    "status is 200": (r) => r.status === 200
  })

  sleep(0.5)
}
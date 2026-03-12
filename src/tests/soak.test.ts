import { check, sleep } from "k6"
import { Options } from "k6/options"
import { getNetInfo } from "../rpc"

export const options: Options = {
  vus: 200,
  duration: "24h"
}

export default function () {
  const res = getNetInfo()

  check(res, {
    "status is 200": (r) => r.status === 200
  })

  sleep(1)
}
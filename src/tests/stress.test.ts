import http from "k6/http";
import { check, sleep } from "k6";
import { RPC_URL } from "../config";

export const options = {
  stages: [
    { duration: "2m", target: 100 },
    { duration: "2m", target: 300 },
    { duration: "2m", target: 600 },
    { duration: "2m", target: 1000 },
    { duration: "2m", target: 1500 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<1000"],
  },
};

export default function () {
  const res = http.get(`${RPC_URL}/block`);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}

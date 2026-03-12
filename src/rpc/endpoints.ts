import http from "k6/http";
import { RPC_URL } from "../config/config";

export function status() {
  return http.get(`${RPC_URL}/status`, {
    tags: { endpoint: "status" },
  });
}

export function block() {
  return http.get(`${RPC_URL}/block`, {
    tags: { endpoint: "block" },
  });
}

export function validators() {
  return http.get(`${RPC_URL}/validators`, {
    tags: { endpoint: "validators" },
  });
}

export function netInfo() {
  return http.get(`${RPC_URL}/net_info`, {
    tags: { endpoint: "net_info" },
  });
}

export function blockResults() {
  return http.get(`${RPC_URL}/block_results`, {
    tags: { endpoint: "block_results" },
  });
}

export const endpoints = [status, block, validators, netInfo, blockResults];

export function randomEndpoint() {
  return endpoints[Math.floor(Math.random() * endpoints.length)];
}

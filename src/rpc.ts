import http from "k6/http"
import { RPC_URL } from "./config"

export function getStatus() {
  return http.get(`${RPC_URL}/status`)
}

export function getBlock() {
  return http.get(`${RPC_URL}/block`)
}

export function getNetInfo() {
  return http.get(`${RPC_URL}/net_info`)
}
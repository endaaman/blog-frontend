import axios from 'axios';


export function fetchJson(url) {
  return fetch(url).then((res) => res.json())
}

export const http = axios.create({
  baseURL: process.env.API_ORIGIN,
  timeout: 5000
})

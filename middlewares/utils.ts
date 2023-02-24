import axios from 'axios';


export function fetchJson(url) {
  return fetch(url).then((res) => res.json())
}

// export const fetcher = (url: string) => fetch(`${process.env.API_ORIGIN}${url}`).then(res => res.json())

export const fetcher = async (url: string, parse: boolean = true) => {
  const u = `${process.env.NEXT_PUBLIC_API_ORIGIN}${url}`
  const res = await fetch(u)
  console.log('URL', u)
  if (parse) {
    return res.json()
  } else {
    return res
  }
}


export const http = axios.create({
  baseURL: process.env.API_ORIGIN,
  timeout: 5000
})

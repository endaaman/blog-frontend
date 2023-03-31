import { plainToClass } from 'class-transformer'

// export function fetchJson(url) {
//   return fetch(url).then((res) => res.json())
// }

// export const fetcher = (url: string) => fetch(`${process.env.API_ORIGIN}${url}`).then(res => res.json())

export async function fetcher (url: string, parse: boolean = true) {
  const u = `${process.env.NEXT_PUBLIC_API_ORIGIN}${url}`
  const res = await fetch(u)

  if (parse) {
    return await res.json()
  } else {
    return res
  }
}

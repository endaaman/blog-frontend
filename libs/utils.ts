import { plainToClass } from 'class-transformer'

// export function fetchJson(url) {
//   return fetch(url).then((res) => res.json())
// }

// export const fetcher = (url: string) => fetch(`${process.env.API_ORIGIN}${url}`).then(res => res.json())

export const fetcher = (T: typeof Object) => (async <T>(url: string, parse: boolean = true): Promise<T|Response> => {
  const u = `${process.env.NEXT_PUBLIC_API_ORIGIN}${url}`
  const res = await fetch(u)

  if (parse) {
    return plainToClass(T, await res.json()) as T
  } else {
    return res
  }
})

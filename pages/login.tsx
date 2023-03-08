import Link from 'next/link'
import useSWR, { SWRConfig } from 'swr'
import { fetcher } from '@/libs/utils'
import type { Category, Article } from '@/libs/models'


export default function() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  )
}

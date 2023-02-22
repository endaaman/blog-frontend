import { useRouter } from 'next/router'



export default function() {
  const router = useRouter()
  const q = router.query

  return (
    <div>
      <pre>{JSON.stringify(q)}</pre>
    </div>
  )
}

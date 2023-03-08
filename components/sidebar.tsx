import Link from 'next/link'
// import sidebar from '@/styles/sidebar.module.css'

export default function Sidebar() {
  return (
    <>
      <ul>
        <li><Link href="/">top</Link></li>
        <li><Link href="/login">login</Link></li>
      </ul>
    </>
  )
}

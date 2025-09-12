import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Triangle | Login'
}

function Page() {
  return (
    <div className="p-5">
      Login Page
      <Link
        className="bg-orange-300 px-4 py-2 ml-3 rounded font-blod"
        href="/register">
        회원가입</Link>
    </div>
  )
}
export default Page
'use client'

import Link from "next/link"
import { navItems } from "../uttils/navigation"
import { usePathname } from "next/navigation"


function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-black py-2 text-slate-100 flex px-4 justify-between">
      <h1>
        <Link href="/">🌜</Link>
      </h1>
      <nav>
        <h2 className="sr-only">메인 메뉴</h2>
        <ul className="flex gap-4">
          {
            navItems.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={pathname === href ? 'text-yellow-500' : ''}
                >
                  {label}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}
export default Header
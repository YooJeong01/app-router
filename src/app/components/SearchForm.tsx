'use client'

import { usePathname, useRouter } from "next/navigation";


function SearchForm() {

  // 얘를 꺼내쓰면 CSR을 쓰는거다
  const router = useRouter();

  const pathname = usePathname();
  // console.log(pathname);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget.querySelector<HTMLInputElement>('#search')!;
    const keyword = input.value.trim();

    router.push(`${pathname}?q=${keyword}`)
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-600 p-2 m-4 rounded flex justify-center">
      <label>
        <input
          type="search"
          className="border border-gray-500 rounded indent-2"
          id="search"
        />
      </label>
      <button
        type="submit"
        className="bg-orange-300 px-2 py-0.5 ml-2 rounded font-blod text-black"
      >검색</button>
    </form>
  )
}
export default SearchForm
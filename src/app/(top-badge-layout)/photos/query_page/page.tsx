'use client'

import { Photo } from "@/app/@types/type"
import fetchPhotos from "@/app/utills/fetchPhotos"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

import Image from "next/image";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: 'Triangle | Photos'
// }

function Page() {
  // useInfinityQuery : 무한 스크롤 구현시 사용

  // const { data, isPending, isError, error } = useQuery<Photo[]>({
  const { data } = useSuspenseQuery<Photo[]>({
    queryKey: ['photos'],
    queryFn: () => fetchPhotos(),
  })

  // if (isPending) {
  //   return (
  //     <ul>
  //       {
  //         Array.from({ length: 8 }).map((_, i) => (
  //           <li key={i} className="h-40 bg-gray-300 animate-pulse rounded"></li>
  //         ))
  //       }
  //     </ul>
  //   )
  // }

  // if (isError) {
  //   return (
  //     <p>🚨 에러 발생 비상! 🚨</p>
  //   )
  // }


  // 클라이언트 컴포넌트에서는 notFound() 사용 못 함
  if (!data || data.length === 0) return <p>데이터 없음...</p>


  return (
    <div>
      <ul className="grid grid-cols-2 gap-4 p-4">
        {
          data.map(({ id, download_url, author, width }) => (
            <li key={id} className="mb-4">
              <Link href={`/photos/query_page/${id}`}>

                <Image
                  src={download_url}
                  alt={author}
                  width={300}
                  height={300}
                  style={{ height: '100%' }}
                  priority={width > 4000}
                />
              </Link>
              <span>작가 : {author}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
export default Page
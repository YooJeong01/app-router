import SearchForm from "@/app/components/SearchForm"
import fetchPhotos from "@/app/utills/fetchPhotos"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Triangle | Search'
}



// params로 조회하면 아무것도 안나온다
// searchParams으로 조회해야한다

// searchParams를 읽으면 무조건 Dynamic으로 분류된다
async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams

  const data = await fetchPhotos({ cache: 'default' });
  // 이렇게 해줘도 빌드시 search를 보면 dynamic이 된다
  // const data = await fetchPhotos({ cache: 'no-store' });

  const filterData = q ? data.filter((d) => d.author.includes(q.toLowerCase())) : []
  console.log(filterData);

  return (
    <div>
      <SearchForm />
      {
        q && (
          <p>
            <b>{q}</b> 검색결과 : {filterData.length}건
          </p>
        )
      }
      <ul className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3">
        {
          filterData.map((photo) => (
            <li key={photo.id}>
              <Link href={`photos/${photo.id}`} aria-label={`${photo.id}번 이미지로 이동합니다`}>
                <Image
                  src={photo.download_url}
                  width={400}
                  height={300}
                  alt={photo.author}
                />
              </Link>
              <span className="block p-2 text-black/90 truncate">Photo by {photo.author}</span>
            </li>
          ))
        }
      </ul>

    </div>
  )
}
export default Page
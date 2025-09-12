import fetchPhotos from "@/app/uttils/fetchPhotos"

import Image from "next/image";
import Link from "next/link";

import { Metadata } from "next"
import { notFound } from "next/navigation";
import { delay } from "@/app/uttils/delay";


export const metadata: Metadata = {
  title: 'Triangle | Photos'
}


// page router에서는 server side 코드로 하던걸 어떻게 가져오냐?
// async 붙여서 그냥 쓰면 된다
async function Page() {

  const data = await fetchPhotos({ cache: 'force-cache' });

  if (!data) notFound()

  await delay();
  return (
    <div>
      <ul className="grid grid-cols-2 gap-4 p-4">
        {
          data.map(({ id, download_url, author, width }) => (
            <li key={id} className="mb-4">
              <Link href={`photos/${id}`}>
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
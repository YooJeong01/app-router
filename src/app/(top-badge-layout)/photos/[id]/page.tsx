import { delay } from "@/app/uttils/delay";
import fetchPhotosByOne from "@/app/uttils/fetchPhotosByOne";
import Image from "next/image";
import { notFound } from "next/navigation";
// RSC(React Server Component)로 동작함



// 동적 세그먼트니까 얘가 페이지를 다 만들어 둘 순 없고, 필요할때마다 가져온다 => dynamic function
// 그치만 몇개 미리 만들어두라고 전달 가능하다
// catch all segment를 쓰고 있기 때문에 전달되는 value도 [] 배열로 전달해야한다
export async function generateStaticParams() {
  return [{ id: '70' }, { id: '71' }, { id: '72' }]
}

export const dynamicParams = true
// false : 미리 만들어진 페이지 이외의 다른 페이지는 접근 불가
// true(default) : 블로킹 폴백 -> 없으면 만들어줌. 있으면 사용함



// export const metadata: Metadata = {
//   title: 'Triangle | Photos'
// }


// dynamic page에서 dynamic하게 metadata를 설정
// next 내장 함수
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // 여기서 데이터 가져오는 경우 try-catch를 꼭 써주세요
  // 안 넘어왔을때 예외처리 해줘야하니까
  // notFound 같은건 여기서 쓸 수 없어요

  return {
    title: `Triangle | Photos-${id}`
  }
}

// 클라이언트라면 async도, params도 쓸 수 없다
async function Page({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const data = await fetchPhotosByOne(id);

  // 없는거라면 404로 넘기는게 안전하다
  // notfound는 server component에서만 사용 가능하다
  if (!data) return notFound();

  await delay();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">👀 작품 자세히 보기 📸</h2>
      <h3>Image ID : {data.id}</h3>
      <Image
        src={data.download_url}
        alt={data.author}
        width={data.width}
        height={data.height}
        priority={data.width > 4000}
      />
      <h4>Photo by : {data.author}</h4>
      <p>
        Image URL : {' '}
        <a className="text-amber-500" href={data.url}>{data.url}</a>
      </p>
    </div>
  )
}
export default Page
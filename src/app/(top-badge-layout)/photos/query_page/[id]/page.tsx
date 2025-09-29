import { delay } from "@/app/utills/delay";
import fetchPhotosByOne from "@/app/utills/fetchPhotosByOne";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [{ id: '70' }, { id: '71' }, { id: '72' }]
}

export const dynamicParams = true


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return {
    title: `Triangle | Photos-${id}`
  }
}

async function Page({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const data = await fetchPhotosByOne(id);

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
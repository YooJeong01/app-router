'use client'

import Image from "next/image";
import { useEffect, useRef } from "react";

function AnimatedPhotoList({ data }: { data: string[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let ctx: { revert(): void } | undefined;
    (async () => {

      if (typeof window === 'undefined') return;

      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger)


      ctx = gsap.context(() => {

        const items = gsap.utils.toArray<HTMLElement>('.photo-item');

        items.forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
              // markers:true
            }
          })
        })

      }, listRef)

      return () => ctx?.revert();

    })()

  }, [])


  return (
    <ul ref={listRef} className="flex flex-col gap-20 p-3 items-center">
      {
        data.map((url) => (
          <li key={url} className="photo-item">
            <Image
              src={url}
              alt={''}
              width={400}
              height={300}
            />
          </li>
        ))
      }
    </ul>
  )
}
export default AnimatedPhotoList
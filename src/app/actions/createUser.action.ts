'use server'

import { cookies } from "next/headers";

// import { revalidatePath, revalidateTag } from "next/cache";

// server action
// 서버 컴포넌트랑 다른건가?
export default async function createUser(_: unknown, formData: FormData) {

  const email = (formData.get('email') ?? '').toString().trim();
  const password = (formData.get('password') ?? '').toString();

  if (!email || !password) throw new Error('이메일과 비밀번호를 입력해주세요');

  // post 통신 해주기
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, name: password }),
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('회원가입 실패');
  }

  // 쿠키를 호출하는건 server client만 가능함
  // 쿠키로 인증정보 주고 받기
  // access_token : 짧은 수명
  const { accessToken, refreshToken } = await res.json();
  const cookieStore = await cookies();
  cookieStore.set('access_token', accessToken, {
    httpOnly: true, // http 통신에서만 쿠키를 전달할 수 있게 허용
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 15, // 초 단위 - 15분
  })

  // refresh_token : 긴 수명
  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30일

  })



  // redirect('/login');

  // useState나 이런걸 쓰지 않기 때문에, 통신은 돼서 데이터가 바뀌더라도
  // ui는 바뀌지 않는다 -> revalidate 해주기
  // PURGE 라고 함

  // // 메인페이지를 리로드 시킴
  // revalidatePath('/')
  // // 특정 곳만 리로드도 가능
  // revalidatePath('/photos/75')
  // // 하위 파일을 모두 갱신 시키고 싶은 경우
  // revalidatePath('/photos/[id]')
  // // 추가로 타입을 지정할 수 있음. 아래는 페이지 단위로 리벨리데이트
  // revalidatePath('/photos/[id]', 'page')
  // // 조건부 리벨리데이트도 가능함
  // // 탑뱃지레이아웃에 있는 폴더를 기준으로 layout을 공유하고 있는걸 다 리벨리데이트함
  // revalidatePath('/(top-badge-layout)', 'layout');
  // // 루트 페이지의 layout을 공유하고있는걸 다 리벨리데이트 => 사실상 전체 리벨리데이트랑 같음
  // revalidatePath('/', 'layout')

  // // fetch 단위로도 리벨리데이트 가능함
  // // fetch 보낼때 태그도 넣어서 보내면 그 태그명을 기준으로 리벨리데이트
  // revalidateTag('tagName')

}
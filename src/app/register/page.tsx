import SubmitForm from "../components/SubmitForm"


function Page() {
  return (
    <>
      <h2 className="text-3xl text-center p-10">회원가입</h2>
      <div className="border border-gray-400 p-5 m-5 rounded">
        <SubmitForm />
      </div>
    </>
  )
}
export default Page
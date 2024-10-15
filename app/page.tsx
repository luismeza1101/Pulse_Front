import Image from "next/image"
import Link from "next/link"

const pageMain = () => {

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full flex justify-between items-center px-9 py-3">
        <h2 className="font-bold text-4xl">PULSE</h2>
        <div className="flex gap-3">
          <Link href='/log-in' className="button-login">Log in</Link>
          <Link href='/sign-in' className="button-login bg-blue-500 text-white">Sign in</Link>
        </div>
      </header>
      <main className="flex flex-col gap-10 w-full max-w-[960px] text-center items-center justify-center flex-grow md:flex-row md:w-[90%] mx-auto lg:gap-28">
        <div className="w-[80%]">
          <h1 className="font-semibold text-5xl mb-5">Connect with those you care about.</h1>
          <p>A dynamic platform where you can share your ideas, discuss topics of interest and connect with like-minded people. Post, comment and discover exciting conversations in a community built by you.</p>
        </div>
        <Image src='/imgs/slogan.jpeg' alt="Slogan" width={300} height={300} className="rounded-lg min-w-[300px] w-1/2" priority/>
      </main>
    </div>
  )
}

export default pageMain

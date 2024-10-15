"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useAuthCheck from "@hooks/userAuth";
import ResponseMessage from "@components/ResponseMessage";
import FormSignIn from "@components/FormSignIn";

export default function SignInPage() {
  const [message, setMessage] = useState<string | null>(null);
  
  useAuthCheck();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
      <div className="w-[80%] mx-auto flex flex-col gap-8">
        <header>
          <h2 className="font-bold text-2xl">Welcome again</h2>
        </header>

        <FormSignIn setMessage={setMessage} />

        <footer className="relative flex items-center justify-center">
          <p className="text-center">
            Don &apos; t have an account?{" "}
            <Link href="/log-in" className="text-blue-500 underline">
              Log in now
            </Link>
          </p>
          <div className="absolute top-[150%]">
            <ResponseMessage data={{message: message, type:'error'}}/>
          </div>
        </footer>
      </div>
  );
}

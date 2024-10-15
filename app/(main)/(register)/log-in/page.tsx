"use client";

import { useEffect, useState } from "react";
import ResponseMessage from "@components/ResponseMessage";
import useAuthCheck from "@hooks/userAuth";
import FormLogIn from "@components/FormLogIn";

const LogInPage = () => {
  const [message, setMessage] = useState<string | null>(null);

  useAuthCheck();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
      <div className="w-[80%] mx-auto flex flex-col gap-8 relative">
        <header>
          <h2 className="font-bold text-2xl">Welcome</h2>
        </header>

        {/* Formulario de registro */}
        <FormLogIn setMessage={setMessage} />

        <footer className="w-full absolute top-[110%] flex items-center justify-center">
          <ResponseMessage data={{message: message, type:'error'}}/>
        </footer>
      </div>
  );
};

export default LogInPage;

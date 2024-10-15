'use client'

import { Credentials, User } from "@types";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@contexts/userContext";
import { fetchLogin, fetchRegister } from "@apis/authService";

interface Props{
    setMessage: (message: string | null) => void
}

const FormLogIn: React.FC<Props> = ({ setMessage }) => {

  const {setUserEmail, setUserName, setUserImg} = useUser()
  const router = useRouter();

  const refName = useRef<HTMLInputElement | null>(null);
  const refLastName = useRef<HTMLInputElement | null>(null);
  const refEmail = useRef<HTMLInputElement | null>(null);
  const refPassword = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = refName.current?.value;
    const lastName = refLastName.current?.value;
    const email = refEmail.current?.value;
    const password = refPassword.current?.value;

    try {
      if (!name || !lastName || !email || !password) {
        throw new Error("Fill in the blanks");
      } else if (password.length < 6) {
        throw new Error("Password invalid");
      }

      const user: User = {
        name: `${name} ${lastName}`,
        email: email,
        password: password,
      };

      const result = await fetchRegister(user);

      if(!result.success){
        throw new Error(result.message)
      }

      const credentials: Credentials = {email: email, password: password}
      
      const resultData = await fetchLogin(credentials)
      setUserEmail(resultData.email)
      setUserName(resultData.name)
      setUserImg(resultData.img_user)

      localStorage.setItem('user_id', resultData.user_id)
      
      router.push("/feed");

    } catch (error) {
      setMessage((error as Error).message);
      if (refName.current) refName.current.value = "";
      if (refLastName.current) refLastName.current.value = "";
      if (refEmail.current) refEmail.current.value = "";
      if (refPassword.current) refPassword.current.value = "";
    }
  };
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
      aria-label="User Registration Form"
    >
      {/* Campos de nombre y apellido */}
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <label htmlFor="name" className="label-data">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="input-data"
            placeholder="Name"
            name="name"
            required
            ref={refName}
          />
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <label htmlFor="lastName" className="label-data">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="input-data"
            placeholder="Last Name"
            name="lastName"
            required
            ref={refLastName}
          />
        </div>
      </div>

      {/* Campo de correo electrónico */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="label-data">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="input-data"
          placeholder="Email"
          name="email"
          required
          ref={refEmail}
        />
      </div>

      {/* Campo de contraseña */}
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="label-data">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="input-data"
          placeholder="Enter password"
          name="password"
          required
          ref={refPassword}
          minLength={6}
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="bg-gray-900 text-white text-lg font-semibold rounded-lg mx-4 py-1 mt-5 hover:bg-gray-700"
      >
        Log in
      </button>
    </form>
  );
};

export default FormLogIn;

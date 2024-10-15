import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Credentials } from "@types";
import {fetchLogin} from "@apis/authService";

interface Props {
  setMessage: (message: string | null) => void;
}

const FormSignIn: React.FC<Props> = ({ setMessage }) => {
  const router = useRouter();

  const refEmail = useRef<HTMLInputElement | null>(null);
  const refPassword = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = refEmail.current?.value;
    const password = refPassword.current?.value;

    try {
      if (!email || !password) {
        throw new Error("Fill in the blanks");
      } else if (password.length < 6) {
        throw new Error("Invalid password");
      }

      const credentials: Credentials = { email: email, password: password };

      const result = await fetchLogin(credentials);

      if(result.success){
        localStorage.setItem('user_id', result.user_id)
        router.push("/feed");
      } else {
        throw new Error(result.message)
      }
      
    } catch (error) {
      if (refEmail.current) refEmail.current.value = "";
      if (refPassword.current) refPassword.current.value = "";
      setMessage((error as Error).message || "An unexpected (error as Error) occurred");
    }
  };
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
      aria-label="Sign in form"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="label-data">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="input-data"
          placeholder="Email"
          required
          ref={refEmail}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="label-data">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="input-data"
          placeholder="Enter password"
          required
          ref={refPassword}
          minLength={6}
        />
      </div>
      <button
        type="submit"
        className="bg-color-button text-white text-lg font-semibold rounded-lg mx-4 py-1 mt-5 hover:bg-color-button-hover"
      >
        Sign in
      </button>
    </form>
  );
};

export default FormSignIn;

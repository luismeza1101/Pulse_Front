"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@contexts/userContext";
import { NewInfoUser, TypeMessage } from "@types";
import useAuthCheck from "@hooks/userAuth";
import newImgUsers from "@hooks/newImgUser";
import ResponseMessage from "@components/ResponseMessage";
import getData from "@hooks/getData";
import { changeDataUser, deleteUserFromBD } from "@apis/dataUser";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const { userEmail, userName, userID, setUserName, setUserImg, setUserEmail, setUserID } = useUser();
  const refNewName = useRef<HTMLInputElement | null>(null);
  const refNewLastName = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState<TypeMessage | null>(null)
  const router = useRouter()

  useAuthCheck();

  useEffect(() => {
    if (!userID) {
      getData({
        setUserEmail: setUserEmail,
        setUserImg: setUserImg,
        setUserName: setUserName,
        setUserID: setUserID,
      });
    }
  }, [userID, setUserEmail, setUserName, setUserImg, setUserID]);


  const handleChangeData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newName = refNewName.current?.value
    const newLastName = refNewLastName.current?.value

    try {
      if(!newName || !newLastName || !userID){
        throw new Error ('Fill the blanck')
      } 

      const newInfo: NewInfoUser = {user_id: userID, new_name: `${newName} ${newLastName}`}

      const response = await changeDataUser(newInfo)

      setUserName(`${newName} ${newLastName}`)
      setUserImg(newImgUsers(`${newName} ${newLastName}`))
      setMessage({message: response.message, type: 'succes'})

    } catch (error) {
      console.error((error as Error).message || 'Unexpected error occurred. Please try again.');
    }

    if(refNewLastName.current?.value) refNewLastName.current.value = ''
    if(refNewName.current?.value) refNewName.current.value = ''
  };

  const deleteUser = async () => {
    try {
      const result = await deleteUserFromBD(userID)
      if(result.message){
        localStorage.removeItem('user_id')
        router.push('/')
      }      
    } catch (error) {
      console.error((error as Error).message || 'Unexpected error ocurred')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 2000)

    return () => clearTimeout(timer)
  },[message])

  return (
    <div className="w-[80%] flex flex-col mt-8 gap-10 max-w-[560px] relative">
      <form className="flex flex-col gap-3" onSubmit={handleChangeData}>
        <h3 className="font-bold text-3xl ">User Information</h3>
        <div>
          <p className="font-semibold">
            Email : <span className="font-normal">{userEmail}</span>
          </p>
          <p className="font-semibold">
             Full Name : <span className="font-normal">{userName}</span>
          </p>
        </div>
        <label htmlFor="name" className="font-semibold">
          New Name :{" "}
        </label>
        <input type="text" id="name" className="input-data" required ref={refNewName}/>
        <label htmlFor="lastname" className="font-semibold">
          New Last Name :{" "}
        </label>
        <input type="text" id="lastname" className="input-data" required ref={refNewLastName}/>
        <button className="cursor-pointer bg-black  text-[#f1f1f1] rounded-lg hover:bg-opacity-70 transition font-semibold px-6 py-1">
          Update
        </button>
      </form>
      <section className="flex flex-col gap-5">
        <h3 className="font-bold text-3xl">Danger</h3>
        <button
          className="cursor-pointer bg-red-600  text-[#f1f1f1] rounded-lg hover:bg-opacity-70 transition font-semibold px-6 py-1"
          onClick={deleteUser}
        >
          Delete account
        </button>
      </section>
      {message && (
        <div className="absolute w-full top-[110%] flex items-center justify-center">
          <ResponseMessage data={message}/>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;

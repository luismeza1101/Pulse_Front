"use client";

import { useEffect, useState } from "react";
import OptionsUser from "@components/OptionsUser";
import { useUser } from "@contexts/userContext";
import Link from "next/link";
import SideBar from "@components/SideBar";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const { userImg } = useUser();
  const siseMaxSidebar = 768

  useEffect(() => {
    if (showOptions && window.screen.width <= siseMaxSidebar) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showOptions]);

  return (
    <>
      <div className="flex flex-col gap-3 items-center w-full min-h-screen pb-5">
        <header className=" w-full h-14 flex items-center justify-between px-3 border-b-2 border-gray-950 sticky top-0 bg-gray-100 z-10">
          <h1 className="font-black text-3xl">
            <Link href="/feed">PULSE</Link>
          </h1>

          <nav className="hidden md:flex gap-5 items-center h-[80%]">
            <Link
              className="px-16 py-1 rounded-lg hover:bg-gray-300 "
              href="/feed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler icons-tabler-filled icon-tabler-home"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" />
              </svg>
            </Link>
            <Link
              className="px-16 py-1 rounded-lg hover:bg-gray-300"
              href="/feed/my_posts"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="icon icon-tabler icons-tabler-outline icon-tabler-user-square"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 10a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M6 21v-1a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v1" />
                <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
              </svg>
            </Link>
          </nav>
          <button
            className="bg-gray-900 text-white font-semibold px-2 py-1 rounded-full flex items-center justify-center"
            onClick={() => setShowOptions(!showOptions)}
          >
            <span>{userImg}</span>
          </button>
          {showOptions && (
            <div
              className="absolute top-full right-5 bg-gray-200 hidden md:flex flex-col w-52 "
            >
              <OptionsUser setShowOptions={setShowOptions} />
            </div>
          )}
        </header>
        {children}
      </div>
      <SideBar setShowOptions={setShowOptions} showOptions={showOptions} />
    </>
  );
}

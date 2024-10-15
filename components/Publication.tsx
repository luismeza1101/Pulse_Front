"use client";

import { useState } from "react";
import PostComments from "@components/PostComments";
import type { TypeMessage } from "@types";
import { deletePostByBD } from "@apis/posts";

interface Props {
  name: string | null;
  content: string;
  date: string;
  post_id: string;
  cant_comments: number;
  delete_post?: boolean;
  setMessage?: (message: TypeMessage | null) => void;
}

const Publication: React.FC<Props> = ({
  content,
  date,
  name,
  post_id,
  delete_post,
  cant_comments,
  setMessage,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [stateNumComments, setStateNumComments] = useState<number>(cant_comments)

  const delete_post_bd = async () => {
    const result = await deletePostByBD(post_id);
    if (setMessage) {
      setMessage({ message: result.message, type: "succes" });
      window.location.reload()
    }
  };

  const showListComments = async () => {
    document.body.classList.add("overflow-hidden");
    setShowComments(true);
  };
  
  return (
    <>
      <article className="border-2 border-gray-500 rounded-xl p-4 flex flex-col gap-2 items-start">
        <header className="flex items-center justify-between w-full">
          <h2 className="font-bold text-lg">{name}</h2>
          <time dateTime={date}>{date}</time>
        </header>

        <p className="w-full break-words md:w-[70%]">{content}</p>

        <footer className="flex justify-between w-full">
          <button
            className="flex items-center gap-2 px-2 py-1 hover:underline"
            aria-label="Show comments"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="icon icon-tabler icons-tabler-outline icon-tabler-message-circle"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
            </svg>
            <span>{stateNumComments} Comments</span>
          </button>

          {delete_post ? (
            <button
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200"
              onClick={showListComments}
              aria-label="Add a comment"
            >
              Comment
            </button>
          ) : (
            <button
              onClick={delete_post_bd}
              aria-label="Delete post"
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200"
            >
              Delete
            </button>
          )}
        </footer>
      </article>

      {showComments && (
        <section aria-labelledby="comments-section">
          <h3 id="comments-section" className="sr-only">
            Comments
          </h3>
          <PostComments
            name={name}
            content={content}
            date={date}
            post_id={post_id}
            setShowComments={setShowComments}
            setNumComments={setStateNumComments}
            numComments={stateNumComments}
          />
        </section>
      )}
    </>
  );
};

export default Publication;

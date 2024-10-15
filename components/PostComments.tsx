"use client";

import { useEffect, useRef, useState } from "react";
import Comment from "@components/Comment";
import type { Comments, postComment } from "@types";
import { useUser } from "@contexts/userContext";
import { addComment, getComments } from "@apis/comments";

interface Props {
  name: string | null;
  content: string;
  date: string;
  post_id: string;
  setShowComments: (show: boolean) => void
  setNumComments: (numCom: number) => void
  numComments: number
}

const Comments: React.FC<Props> = ({
  content,
  date,
  name,
  post_id,
  setShowComments,
  setNumComments,
  numComments
}) => {
  const refContent = useRef<HTMLTextAreaElement | null>(null);
  const [comments, setComments] = useState<Comments[]>([])
  const {userID, userName} = useUser()

  useEffect(() => {
    const getAllComments = async () => {
        const resultComments = await getComments(post_id)
        setComments(resultComments)
    }
    getAllComments()
  }, [])

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const contentComment = refContent.current?.value;

      if (!contentComment) {
        throw new Error("Complete the blanks");
      }

      const data: postComment = {
        post_id: post_id,
        user_id: userID,
        content: contentComment,
      };

      await addComment(data)
      const newComment: Comments = {name: userName, content: contentComment}
      setComments([...comments, newComment])
      setNumComments(numComments + 1)

      if(refContent.current?.value) refContent.current.value = ''

    } catch (error) {
      console.error("Failed to add comment:", error);
    }   
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-45 flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg h-[90%] w-[95%] max-w-[700px] flex flex-col justify-between gap-5 overflow-hidden">
        <div className="sticky top-0 border-b-2 p-4 bg-white z-10">
          <h4>{name}</h4>
          <span>{date}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-xbox-x absolute right-10 top-7 cursor-pointer"
            onClick={() => {
              document.body.classList.remove('overflow-hidden')
              setShowComments(false)
            }}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10m3.6 5.2a1 1 0 0 0 -1.4 .2l-2.2 2.933l-2.2 -2.933a1 1 0 1 0 -1.6 1.2l2.55 3.4l-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2 -2.933l2.2 2.933a1 1 0 0 0 1.6 -1.2l-2.55 -3.4l2.55 -3.4a1 1 0 0 0 -.2 -1.4" />
          </svg>
        </div>
        <div className="flex-1 overflow-y-auto mx-5">
          <p className="border-2 border-gray-500 rounded-lg p-4 ">{content}</p>
          <div className="mx-5 mt-5 flex flex-col gap-3">
            {comments.map(comment => (
              <Comment content={comment.content} name={comment.name}/>
            ))}
          </div>
        </div>
        <form
          className="flex flex-col items-start relative w-[90%] mx-auto"
          onSubmit={handleAddComment}
        >
          <textarea
            className="w-full my-4 mx-auto bg-gray-300 outline-none rounded-md px-4 py-2"
            placeholder="Comment"
            ref={refContent}
            required
          ></textarea>
          <button className=" absolute right-2 bottom-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="icon icon-tabler icons-tabler-outline icon-tabler-send-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
              <path d="M6.5 12h14.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;

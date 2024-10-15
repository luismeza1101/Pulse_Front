"use client";

import { getPostByUser } from "@apis/posts";
import ResponseMessage from "@components/ResponseMessage";
import Loader from "@components/Loader";
import Publication from "@components/Publication";
import { useUser } from "@contexts/userContext";
import getData from "@hooks/getData";
import useAuthCheck from "@hooks/userAuth";
import { MyPosts, TypeMessage } from "@types";
import { useEffect, useState } from "react";

const MyPostsPage = () => {
  const [myPosts, setMyPosts] = useState<MyPosts[]>([]);
  const { userID, userName, setUserEmail, setUserImg, setUserName, setUserID} = useUser();
  const [loading, setLoading] = useState(true);
  const [deletePost, setDeletePost] = useState(true)
  const [message, setMessage] = useState<TypeMessage | null>(null)

  useAuthCheck();

  useEffect(() => {
    const getPosts = async () =>{
      if (!userID) {
        await getData({
          setUserEmail: setUserEmail,
          setUserImg: setUserImg,
          setUserName: setUserName,
          setUserID: setUserID
        });
      }
      if(deletePost && userID){
        const postUser = await getPostByUser(userID, setLoading)
        if(postUser){
          setMyPosts(postUser)
          setDeletePost(false)
        }
      }
    }
    getPosts()
  }, [deletePost, userID, setUserEmail, setUserImg, setUserName, setUserID])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 2000)
    return () => clearTimeout(timer)
  },[message])


  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <main className="min-h-[90%] w-[90%] max-w-[770px] rounded-2xl border-2 border-gray-600 p-4 flex flex-col gap-3 ">
          {message && (
            <div className="w-screen fixed top-9 left-0 z-50 flex justify-center">
              <ResponseMessage data={message}/>
            </div>
            )}
          {myPosts.length == 0 && <p>Don &apos; t exist posts</p>}
          {myPosts.map((post) => (
            <Publication
              key={post.post_id}
              name={userName}
              content={post.content}
              date={post.publication_date}
              post_id={post.post_id}
              cant_comments={post.cant_comments}
              delete_post={false}
              setMessage={setMessage}
            />
          ))}
        </main>
      )}
    </>
  );
};

export default MyPostsPage;

"use client";

import { useEffect, useState } from "react";
import Publication from "@components/Publication";
import { Posts, TypeMessage } from "@types";
import { useUser } from "@contexts/userContext";
import Loader from "@components/Loader";
import useAuthCheck from "@hooks/userAuth";
import getData from "@hooks/getData";
import { getAllPosts } from "@apis/posts";
import PublicateForm from "@components/PublicateForm";
import ResponseMessage from "@components/ResponseMessage";

export default function FeedPage() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFormPost, setShowFormPost] = useState(false);
  const [message, setMessage] = useState<TypeMessage | null>(null);
  const [upPost, setUpPost] = useState(true)
  const {
    setUserEmail,
    setUserImg,
    setUserName,
    setUserID,
    userID,
    userName,
    userEmail,
  } = useUser();

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

  useEffect(() => {
    const getPosts = async () => {
      try {
        if(upPost){
          const returnPosts = await getAllPosts();
          if(returnPosts){
            setPosts(returnPosts)
            setUpPost(false)
          }
        }
      } catch (error) {
        console.error((error as Error).message || 'Error in fecth posts')
      } finally {
        setLoading(false)
      }
    }
    getPosts()
  }, [upPost]);

  const handleShowFormPost = () => {
    setShowFormPost(true);
    document.body.classList.add("overflow-hidden");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      {loading ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="min-h-[90%] w-[90%] max-w-[770px] relative">
          {message && (
            <div className="absolute top-0 w-full flex justify-center items-center">
              <ResponseMessage data={message} />
            </div>
          )}
          <section className="border-2 border-gray-600 w-full rounded-2xl mb-4 flex justify-around py-4">
            <div>
              <p className="font-semibold text-2xl mb-2">{userName}</p>
              <p className="text-gray-500">{userEmail}</p>
            </div>
            <button
              className="bg-black  text-[#f1f1f1] rounded-lg hover:bg-opacity-70 transition font-semibold px-6 py-1"
              onClick={handleShowFormPost}
            >
              Add Post
            </button>
          </section>
          <main className="w-full rounded-2xl border-2 border-gray-600 p-4 flex flex-col gap-3">
            {posts.length == 0 && (
              <p className="text-center">Don &apos; t exits posts</p>
            )}
            {posts.map((post) => (
              <Publication
                key={post.post_id}
                name={post.user_name}
                content={post.content}
                date={post.publication_date}
                post_id={post.post_id}
                cant_comments={post.cant_comments}
                delete_post={true}
              />
            ))}
            {showFormPost && (
              <PublicateForm
                setShowFormPost={setShowFormPost}
                setMessage={setMessage}
                setUpPost={setUpPost}
              />
            )}
          </main>
        </div>
      )}
    </>
  );
}

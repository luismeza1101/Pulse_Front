import { useRef, useState } from "react";
import { useUser } from "@contexts/userContext";
import { TypeMessage } from "@types";
import { addPost } from "@apis/posts";

interface Props {
  setShowFormPost: (show: boolean) => void;
  setMessage: (message: TypeMessage | null) => void;
  setUpPost: (upPost: boolean) => void
}

const PublicateForm: React.FC<Props> = ({ setShowFormPost, setMessage, setUpPost}) => {
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const { userID } = useUser();
  const [cantChar, setCantChar] = useState(0);
  const CANT_MAX_CHAR_COMMENTS = 200;

  const handleShowFormPost = () => {
    setShowFormPost(false);
    document.body.classList.remove("overflow-hidden");
  };

  const addNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = contentRef.current?.value;
    try {
      if (!content) {
        throw new Error("Fill in the blanks");
      }
      
      const result = await addPost(userID, content);
      setMessage({
        message: result.message,
        type: "succes",
      });

      setUpPost(true)
      handleShowFormPost();
    } catch (error: any) {
      setMessage({
        message: error.message,
        type: "error",
      });
      handleShowFormPost();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-45 flex items-center justify-center h-screen">
      <form
        className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-md relative flex flex-col gap-4"
        onSubmit={addNewPost}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="icon icon-tabler icons-tabler-outline icon-tabler-x absolute right-4 top-4 cursor-pointer"
          onClick={handleShowFormPost}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
        <h3 className="text-center font-semibold">Add New Publication</h3>
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none"
          placeholder="Start writing"
          required
          ref={contentRef}
          onChange={(e) => setCantChar(e.target.value.length)}
          maxLength={CANT_MAX_CHAR_COMMENTS}
        ></textarea>
        <p
          className={`text-sm ${
            cantChar >= CANT_MAX_CHAR_COMMENTS
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          {cantChar}/200
        </p>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PublicateForm;

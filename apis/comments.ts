import { postComment } from "@types";

export const getComments = async (post_id: string) => {
  try {
    const response = await fetch(`http://localhost:8000/comments/${post_id}`);

    if (!response.ok) {
      throw new Error("Error in fetch comments");
    }

    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error(error);
  }
};

export const addComment = async (data: postComment) => {
  const response = await fetch("http://localhost:8000/add_comment/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error in adding comment: ${errorMessage}`);
  }
};

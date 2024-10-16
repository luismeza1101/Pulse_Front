import { postComment } from "@types";

const apiUrl = process.env.NEXT_PUBLIC_URL_BACK;


export const getComments = async (post_id: string) => {
  try {
    const response = await fetch(`${apiUrl}/comments/${post_id}`);

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
  const response = await fetch(`${apiUrl}/add_comment/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error in adding comment: ${errorMessage}`);
  }
};

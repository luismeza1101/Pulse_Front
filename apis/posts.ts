import { MyPosts, Posts } from "@types";

export const getPostByUser = async (
  user_id: string | null,
  setLoading: (load: boolean) => void,
) => {
  try {
    let postsByUser: MyPosts[] = []
    const response = await fetch(`http://localhost:8000/post-by-id/${user_id}`);

    if (!response.ok) {
      throw new Error("Error in fetching posts");
    }

    const data = await response.json()
    postsByUser = data
    return postsByUser
  } catch (error) {
    console.error("error");
  } finally {
    setLoading(false);
  }
};

export const getAllPosts = async () => {
    let posts: Posts[] = []
    const response = await fetch("http://localhost:8000/posts");
    if (!response.ok) {
      throw new Error("Error fetching posts");
    }
    const data = await response.json();
    posts = data
    return posts
};

export const deletePostByBD = async (post_id: string) => {
  try {
    const response = await fetch(
      `http://localhost:8000/delete_post/${post_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error in delete post");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const addPost = async (userID: string  | null, content: string) => {
  try {
    const response = await fetch("http://localhost:8000/post/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userID, content: content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error in the creation");
    }

    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

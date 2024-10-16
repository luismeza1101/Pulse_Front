import { NewInfoUser } from "@types";

const apiUrl = process.env.NEXT_PUBLIC_URL_BACK;


export const changeDataUser = async (newInfo: NewInfoUser) => {
  const response = await fetch(`${apiUrl}/edit_user/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newInfo),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error in updating user information");
  }

  return await response.json();
};

export const deleteUserFromBD = async (userID: string | null) => {
  const response = await fetch(`${apiUrl}/delete-user/${userID}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to delete user");
  }

  return await response.json();
};

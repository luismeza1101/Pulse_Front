import { Credentials, User } from "@types";

export async function fetchLogin(credentials: Credentials) {
  const response = await fetch("http://localhost:8000/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Login failed");
  }

  return response.json();
}

export async function fetchRegister(dataUser: User) {
  const response = await fetch("http://localhost:8000/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataUser),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error in the user creation");
  }

  return await response.json();
}

export async function getDataUser(user_id: string) {
  try {
    const response = await fetch(`http://localhost:8000/info_user/${user_id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error in the user creation");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

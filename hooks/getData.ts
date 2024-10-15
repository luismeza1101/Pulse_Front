import { getDataUser } from "@apis/authService";

interface Props {
  setUserEmail: (email: string | null) => void;
  setUserName: (name: string | null) => void;
  setUserImg: (img: string | null) => void;
  setUserID: (user_id: string | null) => void;
}

const getData = async ({
  setUserEmail,
  setUserImg,
  setUserName,
  setUserID
}: Props) => {
  try {
    const user_id = localStorage.getItem('user_id')
    if (!user_id) {
      throw new Error("Error al obtener el user_id");
    }
    const response = await getDataUser(user_id);
    setUserEmail(response.email);
    setUserName(response.name);
    setUserImg(response.img_user);
    setUserID(user_id)
  } catch (error) {
    console.error("Error fetching user data", error);
  }
};

export default getData;

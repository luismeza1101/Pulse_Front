import { useRouter } from "next/navigation";
import { useEffect } from "react";

const pagesWithToken = ["/feed", "/feed/my_posts", "/feed/user_settings"];
const pagesWithoutToken = [ "/log-in", "/sign-in"];

export default function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const currentPath = window.location.pathname;

    if (!user_id && pagesWithToken.includes(currentPath)) {
      router.push("/");
    }

    if (user_id && pagesWithoutToken.includes(currentPath)) {
      router.push("/feed"); 
    }
  }, [router]);
}

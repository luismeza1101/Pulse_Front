import Link from "next/link";

interface Props{
    setShowOptions: (show: boolean) => void
}

const OptionsUser: React.FC<Props> = ({setShowOptions}) => {

    const logOut = () => {
      localStorage.removeItem('user_id')
      window.location.reload()
    }

  return (
    <>
        <Link
          href="/feed/user_settings"
          className="cursor-pointer hover:bg-gray-300 transition font-semibold px-6 py-1 text-center"
          onClick={() => setShowOptions(false)}
        >
          Settings
        </Link>
        <button
          className="cursor-pointer hover:bg-red-200 transition font-semibold px-6 py-1"
          onClick={logOut}
        >
          Log Out
        </button>
    </>
  );
};

export default OptionsUser;

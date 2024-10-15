import logOut from "@hooks/logOut";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  setShowOptions: (show: boolean) => void;
  showOptions: boolean;
}

const SideBar: React.FC<Props> = ({ setShowOptions, showOptions }) => {
  const router = useRouter();
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      x: "100%",
      transition: {
        stiffness: 20,
      },
    },
  };

  const handleRedirection = (direcction: string) => {
    router.push(direcction);
    setShowOptions(false);
  };

  return (
    <div className="md:hidden">
      {showOptions && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-20"
          onClick={() => setShowOptions(false)}
        ></div>
      )}
      <motion.div
        className="fixed top-0 right-0 h-full w-64 bg-white flex flex-col z-50"
        initial={false}
        animate={showOptions ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex justify-between px-4 py-5 border-b-2">
          <h4 className="font-bold text-2xl">PULSE</h4>
          <button onClick={() => setShowOptions(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="icon icon-tabler icons-tabler-outline icon-tabler-x"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-4 flex flex-col h-full">
          <ul className="flex flex-col flex-grow">
            <li
              className="item-sidebar"
              onClick={() => handleRedirection("/feed")}
            >
              Home
            </li>
            <li
              className="item-sidebar"
              onClick={() => handleRedirection("/feed/my_posts")}
            >
              My Posts
            </li>
            <li
              className="item-sidebar"
              onClick={() => handleRedirection("/feed/user_settings")}
            >
              Settings
            </li>
            <li
              className="mt-auto px-4 py-3 hover:bg-red-200 cursor-pointer"
              onClick={logOut}
            >
              Log Out
            </li>
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default SideBar;

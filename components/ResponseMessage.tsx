import { TypeMessage } from "@types";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  data: TypeMessage;
}

const ResponseMessage: React.FC<Props> = ({ data }) => {
  return (
    <AnimatePresence>
      {data.message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`bg-white flex items-center justify-center gap-6 w-60 h-12 rounded-lg border-2 px-[10px] ${
              data.type == "succes" ? "border-green-500" : "border-[#d65563]"
            } `}
          >
            <div className="flex gap-2">
              <div
                className={`${
                  data.type == "succes" ? "text-green-500" : "text-[#d65563]"
                } backdrop-blur-xl`}
              >
                {data.type == "succes" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
            <p>{data.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponseMessage;

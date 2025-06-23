import { motion } from "framer-motion";
import style from "./index.module.css";
import { fadeInUp, staggerContainer, staggerItem } from "~/lib/animations";

export default function Title({
  tabs,
  children,
  className,
  activeTab,
  changeTabHandler,
}: {
  tabs?: Array<{ label: string; value: string }>;
  children: string;
  className?: string;
  activeTab?: string;
  changeTabHandler?: (label: string) => void;
}) {
  return (
    <motion.div
      className={`${style["title"]} ${
        className || ""
      } mb-10 max-lg:flex max-lg:flex-col w-full`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        className="flex flex-col text-center max-lg:items-center"
        variants={fadeInUp}
      >
        {children}
      </motion.h2>

      <motion.div
        className="max-lg:overflow-scroll max-lg:w-full md:flex md:max-lg:justify-center"
        variants={fadeInUp}
      >
        {tabs && (
          <motion.ul
            className="max-lg:mt-4 flex-nowrap w-max"
            variants={staggerContainer}
          >
            {tabs.map((tab, i) => (
              <motion.li key={i} variants={staggerItem}>
                <motion.button
                  className={`${
                    activeTab === tab.value ? style["active"] : ""
                  } w-max`}
                  onClick={() =>
                    changeTabHandler && changeTabHandler(tab.value)
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </motion.div>
  );
}

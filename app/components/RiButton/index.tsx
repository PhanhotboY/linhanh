import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import css from "./index.module.css";
import { bounceIn } from "~/lib/animations";

export default function RiButton({
  children,
  className,
  style,
  href,
}: {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  href: string;
}) {
  return (
    <motion.div
      variants={bounceIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link className={`${css.button} ${className}`} to={href} style={style}>
        {children}
      </Link>
    </motion.div>
  );
}

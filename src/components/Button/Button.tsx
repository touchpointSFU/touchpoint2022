import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: string;
  href?: string;
  huge?: boolean;
  noDescender?: boolean;
  target?: string;
};

const Button = ({ children, href, huge, noDescender, target }: Props) => {
  return (
    <motion.a
      target={target}
      className={`inline-block font-script no-underline bg-white border border-black ${
        huge ? "text-[11vw]" : ""
      } pl-[.16em] pr-[.35em] pt-[.25em] ${
        noDescender ? "pb-[0em]" : "pb-[.14em]"
      } tracking-tighter leading-none`}
      href={href || "#"}
      whileHover={{
        backgroundColor: "black",
        color: "white",
      }}
    >
      {children}
    </motion.a>
  );
};

export default Button;

import { motion } from "framer-motion";
import React, { useState } from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  children: string;
  href: string;
  border?: boolean;
};

const transition = {
  ease: AnimationConfig.EASING,
  duration: AnimationConfig.FAST,
};

const ExternalLink = ({ children, href, border }: Props) => {
  const [isHovering, setIsHovering] = useState(false);

  const borderStyle =
    "inline-flex items-center justify no-underline border border-black px-2 py-1 mx-1 my-1 hover:invert hover:border-white bg-white ";

  const noBorderStyle = "inline-flex items-center justify no-underline";

  return (
    <a
      href={href}
      className={border ? borderStyle : noBorderStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      target="_blank"
    >
      <span className="mr-[.25em]">{children}</span>{" "}
      <div className="h-[.72em] w-[.72em] overflow-hidden relative">
        <motion.img
          animate={{
            y: isHovering ? "-.72em" : "0em",
            x: isHovering ? ".72em" : "0em",
          }}
          src="icon-external-link.svg"
          transition={transition}
        />
        <motion.img
          animate={{
            y: isHovering ? "-.72em" : "0em",
            x: isHovering ? ".72em" : "0em",
          }}
          className="pt-[.05em] pr-[.05em] absolute left-[-100%]"
          src="icon-external-link.svg"
          transition={transition}
        />
      </div>
    </a>
  );
};

export default ExternalLink;

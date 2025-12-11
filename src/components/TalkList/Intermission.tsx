import React, { MutableRefObject, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface Props {}

export const Intermission = (props: Props) => {
  const scrollAnimation = useAnimation();

  const lastElmRef =
    useRef<HTMLSpanElement>() as MutableRefObject<HTMLSpanElement>;

  useEffect(() => {
    if (typeof lastElmRef.current === "undefined") {
      console.warn("last element not found");
      return;
    }

    function resetAnimation() {
      const lastElmBound = lastElmRef.current?.getBoundingClientRect();

      if (typeof window === "undefined" || !lastElmBound) return;
      const targetOffset = -lastElmBound.width;

      scrollAnimation.set({
        x: targetOffset,
      });

      scrollAnimation.start({
        x: 0,
        transition: {
          repeat: Infinity,
          duration: lastElmBound.width * 0.006,
          ease: "linear",
        },
      });
    }
    window.addEventListener("resize", resetAnimation);
    // hacky way to get the animation
    setTimeout(() => resetAnimation(), 1000);
    resetAnimation();

    return () => {
      window.removeEventListener("resize", resetAnimation);
    };
  }, []);

  return (
    <div className="overflow-hidden -mb-[.5em] text-huge-script font-script -tracking-[.02em]">
      <div className="border-b-[1px] border-black relative bottom-[.5em]">
        <motion.div
          animate={scrollAnimation}
          className="leading-[1.4em] relative top-[.505em] whitespace-nowrap"
        >
          <span className="pr-[.3em]">Intermission</span>
          <span className="pr-[.3em]" ref={lastElmRef}>
            Intermission
          </span>
          <span className="">Intermission</span>
        </motion.div>
      </div>
    </div>
  );
};

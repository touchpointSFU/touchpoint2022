import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import useMeasureElement from "../../hooks/useMeasureElement";

type Props = { children: React.ReactNode };
const InfoBar = ({ children }: Props) => {
  const [measurement, ref] = useMeasureElement<HTMLDivElement>([]);
  const [containerMeasurement, containerRef] =
    useMeasureElement<HTMLDivElement>([]);

  const prevWidth = useRef(0);

  const control = useAnimation();
  useEffect(() => {
    if (!containerMeasurement || !measurement) return;

    control.stop();

    if (containerMeasurement.width !== prevWidth.current) {
      control.set({ x: -measurement.width });
      prevWidth.current = containerMeasurement.width;
    }

    control.start({
      x: containerMeasurement.width,
      transition: {
        duration: containerMeasurement.width * 0.014,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [measurement, containerMeasurement]);

  return (
    <motion.div
      className="fixed bottom-0 text-tiny bg-accent-red border-t border-black w-full overflow-hidden z-40"
      initial={{ y: "100%" }}
      animate={{
        y: "0%",
        transition: {
          duration: AnimationConfig.NORMAL,
          ease: AnimationConfig.EASING,
          delay: 0.5,
        },
      }}
      ref={containerRef}
    >
      <motion.div
        className="my-1 whitespace-nowrap inline-flex flex-row"
        // initial={{ x: "100%" }}
        animate={control}
        ref={ref}
      >
        {children}
        {/* <div className="min-w-screen">{children}</div> */}
        {/* <div className="">{children}</div> */}
      </motion.div>
    </motion.div>
  );
};

export default InfoBar;

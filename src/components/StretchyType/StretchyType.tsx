import React, {
  ReactElement,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";

interface Props {
  children?: React.ReactNode;
}

export default function StretchyType({ children }: Props): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heightScale, setHeightScale] = useState(1);

  useEffect(() => {
    function handleResize() {
      // handle resize
      if (!containerRef.current) return;
      const measuredHeight = containerRef.current.clientHeight + 10;
      setHeightScale(window.innerHeight / measuredHeight);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="uppercase text-justify leading-[.85] px-5 origin-top-left"
      style={{
        fontSize: "3.8vw",
        transform: `scaleY(${heightScale})`,
      }}
    >
      {children}
    </div>
  );
}

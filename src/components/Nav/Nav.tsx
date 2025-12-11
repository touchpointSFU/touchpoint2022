import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { useMobileBreakpoint } from "../../hooks/useBreakpoint";
import GetTicketsButton from "../Button/GetTicketsButton";
import { useRouter } from "next/router";

type Props = {
  isLoaded: boolean;
  children: React.ReactNode;
};

const NavLink = ({
  children,
  href,
  isActive,
  navItemIndex,
  currentIndex,
  onLinkHover,
  onClick,
}) => {
  const motionDiretion = currentIndex > navItemIndex ? "+" : "-";

  return (
    <Link
      href={href}
      className="text-tiny no-underline mr-4 sm:mr-8 text-black flex flex-row items-center"
      onMouseEnter={() => onLinkHover()}
      onClick={onClick}
    >
      <div className="rounded-full w-[.5em] h-[.5em] border border-black mr-[.3em] overflow-hidden">
        <motion.div
          className="w-full h-full bg-black rounded-full"
          initial={{ x: "-100%" }}
          animate={{
            x: isActive ? 0 : motionDiretion + "100%",
          }}
          transition={{
            ease: AnimationConfig.EASING,
            duration: 0.2,
          }}
        ></motion.div>
      </div>
      {children}
      {/* </a> */}
    </Link>
  );
};

const NAV_ITEMS = [
  {
    label: "Conference",
    url: "/",
  },
  {
    label: "About",
    url: "/about",
  },
  {
    label: "Interview",
    url: "/interview",
  },
];

const Nav = ({ children, isLoaded }: Props) => {
  const mobileBreakpoint = useMobileBreakpoint();

  // the section in view
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  // the dispalying section
  // const [isHovering, setIsHovering] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(null);

  const router = useRouter();
  useEffect(() => {
    // console.log(router.pathname);
    const currentSectionIndex = NAV_ITEMS.findIndex(
      ({ url }) => url === router.pathname
    );
    setCurrentSectionIndex(currentSectionIndex);
  }, [router.pathname]);

  useEffect(() => {
    // if (isHovering) return;
    setActiveSectionIndex(currentSectionIndex);
  }, [currentSectionIndex]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        className="mx-4 md:mx-document-side z-[1000] h-16 sm:h-24 fixed left-0 right-0 flex flex-row items-center align-center"
      >
        <div
          className="flex flex-row"
          // onMouseLeave={() => setIsHovering(false)}
          // onMouseEnter={() => setIsHovering(true)}
        >
          {Object.values(NAV_ITEMS).map((nameItemName, i) => {
            const isHoveringSection = activeSectionIndex === i;

            return (
              <NavLink
                href={`${nameItemName.url}`}
                isActive={isHoveringSection}
                currentIndex={currentSectionIndex}
                navItemIndex={i}
                key={i}
                onLinkHover={() => {
                  // setActiveSectionIndex(i)
                }}
                onClick={() => setCurrentSectionIndex(i)}
              >
                {nameItemName.label}
              </NavLink>
            );
          })}
        </div>
        <div className="ml-auto text-[30px]">
          {mobileBreakpoint && <GetTicketsButton />}
        </div>
      </motion.nav>
      {children}
    </>
  );
};

export { Nav };

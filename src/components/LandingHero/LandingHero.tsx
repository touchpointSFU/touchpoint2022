import React from "react";
import { useMobileBreakpoint } from "../../hooks/useBreakpoint";
import GetTicketsButton from "../Button/GetTicketsButton";
import { LandingEffect } from "../LandingEffect/LandingEffect";

type Props = {};

const LandingHero = (props: Props) => {
  const mobileBreakpoint = useMobileBreakpoint();

  console.log(mobileBreakpoint);

  const block =
    "bg-black text-white border sm:border-2 border-white px-fluid-medium py-fluid-small ";

  return (
    <LandingEffect>
      <div className="h-24"></div>
      <div className="mx-4 md:mx-document-side">
        <img src="wordmark.svg" className="w-full" />
        <div className="relative flex-grow -mt-[1.2%] text-fluid-medium">
          {/* (left) date group */}
          <div className="absolute flex flex-col -translate-y-[0%] translate-x-[12.5%]">
            <div
              className={block + "mr-auto border-b-0 sm:border-b-0 z-10 pb-0"}
            >
              Saturday
            </div>
            <div className={block + "mr-auto mt-[-2px] z-0"}>
              {"04/02/2022"}
            </div>
          </div>
          {/* (right) location group */}
          <div className="absolute flex flex-col right-0 -translate-y-[0%]">
            <div className={block + "z-10"}>
              13450 102 Ave Unit 110, Surrey, BC
            </div>
            <div
              className={
                block + "mr-auto -translate-x-[30%] -translate-y-[.15em]"
              }
            >
              Annual Design Conference
            </div>
          </div>
          {/* <div className="absolute flex flex-row right-0 top-[3em]"> */}
          {/* <div className={block + "mr-4"}>SPEAKERS TBA</div> */}
          {/* <div className={block + "mr-auto"}>4/02/2022</div> */}
          {/* </div> */}
        </div>
      </div>

      {!mobileBreakpoint && (
        <div className="flex absolute left-0 right-0 w-[100%] bottom-[25vh]">
          <div className="mx-auto text-[10vw]">
            <GetTicketsButton />
          </div>
        </div>
      )}
    </LandingEffect>
  );
};

export default LandingHero;

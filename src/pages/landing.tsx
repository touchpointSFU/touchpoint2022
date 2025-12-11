import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { EffectOverlay } from "../components/EffectOverlay";
import { Nav } from "../components/Nav/Nav";
import StretchyType from "../components/StretchyType/StretchyType";

const Landing: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Touchpoint 2022</title>
        <meta name="description" content="Touchpoint 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EffectOverlay>
        {/* The Canvaas Overlay */}
        <main className="overflow-hidden h-screen w-screen">
          <StretchyType>
            Touchpoint 2022: "TAGLINE HERE" is now accepting applications for
            our annual{" "}
            <a href="#" className="h-[.4vh]">
              interviews
            </a>
            . speaker list and conference schedule will be announced on a later
            date. Thank you.
          </StretchyType>
        </main>
      </EffectOverlay>
    </div>
  );
};

export default Landing;

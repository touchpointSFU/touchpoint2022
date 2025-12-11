import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import FloatingCard from "../components/FloatingCard/FloatingCard";
import { Intermission, TalkItem, TalkList } from "../components/TalkList";
import TalkInformation from "../data/talks";

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Touchpoint 2022</title>
        <meta name="description" content="Touchpoint 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <FloatingCard />
      </main>
    </div>
  );
};

export default About;

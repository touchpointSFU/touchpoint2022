import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Intermission, TalkItem, TalkList } from "../components/TalkList";
import TalkInformation from "../data/talks";

const Speakers: NextPage = () => {
  const intermissionIndex = 4;

  return (
    <div>
      <Head>
        <title>Touchpoint 2022</title>
        <meta name="description" content="Touchpoint 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <h1 className="mt-4 ml-8 text-small uppercase mb-64">Some title</h1> */}
        <TalkList>
          {TalkInformation.map(
            ({ time, graduation, role, name, title }, index) => {
              return (
                <React.Fragment key={index}>
                  {index === intermissionIndex && <Intermission />}
                  <TalkItem time={time} graduation={graduation} role={role}>
                    {`${name} “${title}”`}
                  </TalkItem>
                </React.Fragment>
              );
            }
          )}
        </TalkList>
      </main>
    </div>
  );
};

export default Speakers;

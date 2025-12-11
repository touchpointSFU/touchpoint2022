import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Button from "../components/Button/Button";
import ExternalLink from "../components/ExternalLink/ExternalLink";
import FloatingCard from "../components/FloatingCard/FloatingCard";
import BigText from "../components/Layout/BigText";
import ContentGroup from "../components/Layout/ContentGroup";
import ContentGroupLabel from "../components/Layout/ContentGroupLabel";
import Section from "../components/Layout/Section";

const Interview: NextPage = () => {
  const companies: { [key: string]: string } = {
    "All Purpose": "https://www.allpurpose.io/",
    "Engine Digital": "https://enginedigital.com/",
    Invoke: "https://invokedigital.co/",
    "Green Stone": "https://www.greenstone.co/",
    // Handsome: "https://handsome.is/",
    Dossier: "https://www.dossiercreative.com/",
    Rivaltech: "https://www.rivaltech.com/",
    SAP: "https://www.sap.com/",
    "Telus Digital": "https://www.telus.com/en/digital",
  };

  return (
    <div>
      <Head>
        <title>Interview — Touchpoint 2022</title>
        <meta name="description" content="Touchpoint 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* for nav bar compensation */}
        <div className="h-24"></div>
        <Section id="Interview" noSeparator>
          <ContentGroup mediumPadding>
            <ContentGroupLabel>Interviews With</ContentGroupLabel>
            <div className="text-small w-3/4 uppercase mt-2">
              {Object.keys(companies).map((company, index) => (
                <ExternalLink href={companies[company]} key={index} border>
                  {company}
                </ExternalLink>
              ))}
            </div>
          </ContentGroup>
          <ContentGroup noPadding>
            <ContentGroupLabel>
              Applications{" "}
              {/* <span className="ml-14 font-sans">01/01/22 — 01/02/22</span> */}
            </ContentGroupLabel>
            <BigText>
              SIAT students and alumni are invited to apply to interview with
              one of eight design agencies and product companies at Touchpoint.
              Interviews will be held remotely between April 4-8, 2022.
            </BigText>
            <div className="my-[.75em]">
              <Button
                href="https://forms.gle/3214i8LRmPCpeMRbA"
                huge
                target="_blank"
              >
                Apply Here
              </Button>
            </div>
            <BigText>
              Applications close on Tuesday, March 22 at 5:00PM.
            </BigText>
          </ContentGroup>
        </Section>
      </main>
    </div>
  );
};

export default Interview;

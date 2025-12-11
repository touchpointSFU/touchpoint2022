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

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>About — Touchpoint 2022</title>
        <meta name="description" content="Touchpoint 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* for nav bar compensation */}
        <div className="h-24"></div>
        <Section id="About" noSeparator>
          <ContentGroup>
            <ContentGroupLabel>About</ContentGroupLabel>
            <BigText>
              Hosted by SFU and the School of Interactive Arts and Technology,
              Touchpoint is an annual design conference for Vancouver’s creative
              community.
            </BigText>
          </ContentGroup>
          <ContentGroup>
            <ContentGroupLabel>Contact</ContentGroupLabel>
            <BigText>
              <a href="mailto:info@touchpointsfu.ca">info@touchpointsfu.ca</a>
            </BigText>
          </ContentGroup>
          <ContentGroup noPadding>
            <ContentGroupLabel>Location</ContentGroupLabel>
            <BigText>
              <div>SFU Surrey, SYRE Building 10285</div>
              <div>University Dr, Surrey, BC</div>
            </BigText>
          </ContentGroup>
        </Section>
      </main>
    </div>
  );
};

export default About;

import type { NextPage } from "next";
import Head from "next/head";
import LandingHero from "../components/LandingHero/LandingHero";
import Section from "../components/Layout/Section";
import BigText from "../components/Layout/BigText";
import ExternalLink from "../components/ExternalLink/ExternalLink";
import { motion } from "framer-motion";
import { useIsPageLoaded } from "../components/PageWrapper/PageWrapper";
import { Intermission, TalkItem, TalkList } from "../components/TalkList";
import TalkInformation from "../data/talks";

const Home: NextPage = () => {
  const isLoaded = useIsPageLoaded();

  return (
    <>
      <Head>
        <title>Touchpoint 2022</title>
        <meta name="description" content="Touchpoint 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : 20,
          transition: { duration: 0.5 },
        }}
      >
        <Section id="Conference" noStyling>
          <LandingHero />
        </Section>

        <Section id="Speaker" separatorOnly>
          <TalkList>
            {TalkInformation.map(
              ({ time, graduation, role, name, company }, index) => {
                if (time === "intermission") return <Intermission />;

                return (
                  <TalkItem
                    time={time}
                    graduation={graduation}
                    role={role}
                    key={index}
                  >
                    {company !== "" && (
                      <>
                        <span className="avoidwrap">{name} </span>
                        <span className="avoidwrap">
                          &nbsp;for&nbsp;
                          {company}
                        </span>
                      </>
                    )}
                    {company === "" && (
                      <>
                        <span className="avoidwrap">{name}</span>
                      </>
                    )}
                  </TalkItem>
                );
              }
            )}
          </TalkList>
        </Section>

        <Section noSeparator>
          <BigText>
            <ExternalLink href="https://www.sfu.ca/idc/">
              2020 Site
            </ExternalLink>
          </BigText>
        </Section>
      </motion.main>
    </>
  );
};

export default Home;

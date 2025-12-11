import React, { useContext, useEffect, useState } from "react";
import InfoBar from "../InfoBar/InfoBar";
import { Nav } from "../Nav/Nav";

type Props = {
  children: React.ReactNode;
};

const PageLoadedContext = React.createContext(false);

const useIsPageLoaded = () => useContext(PageLoadedContext);

const PageWrapper = ({ children }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <PageLoadedContext.Provider value={isLoaded}>
      <InfoBar>
        TALKS @ SFU SRYE (04/02/22) from 10:00AM — 4:00PM / 10285 University Dr,
        Surrey, BC
      </InfoBar>
      <Nav isLoaded={isLoaded}>{children}</Nav>
    </PageLoadedContext.Provider>
  );
};

export { PageWrapper, useIsPageLoaded };

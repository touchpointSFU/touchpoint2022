import "../styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { PageWrapper } from "../components/PageWrapper/PageWrapper";

const lausanne = localFont({
  src: [
    {
      path: "../fonts/lausanne-300-webfont.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/lausanne-300-webfont.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-lausanne",
  display: "swap",
});
const kuenstler = localFont({
  src: [
    {
      path: "../fonts/KuenstlerScriptLTStd-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/KuenstlerScriptLTStd-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-kuenstler",
  display: "swap",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${lausanne.variable} ${kuenstler.variable}`}>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </div>
  );
}

export default MyApp;

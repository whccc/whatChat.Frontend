import React from "react";
import { AppProps } from "next/app";
import GlobalStyle from "../styles/global.styles";
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import Head from "next/head";
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <title>Chat</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
};

export default MyApp;

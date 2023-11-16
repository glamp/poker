import "@/styles/globals.css";
import createCache from "@emotion/cache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import "../styles/globals.css";

const themeOptions: ThemeOptions = {
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: [
      "Satoshi",
      "Erode",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 13,
    fontWeightBold: 700,
    subtitle1: {
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 16,
    },
  },
  // https://huemint.com/brand-intersection/#palette=b64a2f-6ac4ac-d7c49e-1c1a2f
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#118C4F",
    },
    info: {
      main: "#85bb65",
    },
    success: {
      main: "#4BB543",
      contrastText: "#fff",
    },
    warning: {
      main: "#f5c25c",
    },
    error: {
      main: "#ff0033",
    },
    background: {
      paper: "#ffffff",
      default: "#00000004",
    },
  },
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(themeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const client = new Ably.Realtime.Promise({
    key: "57zA6w.Z68jVA:yDSZeTnTjIe9jmCoqh9WlanotLVzZyQfHk1s0wiN19k",
    clientId: "57zA6w",
  });

  return (
    <AblyProvider client={client}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Head>
            <title>Wild Cards</title>
            <meta name="description" content="Wild Cards!" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </AblyProvider>
  );
};

export default MyApp;

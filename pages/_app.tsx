import React from 'react';
import App from 'next/app';
import { Inter } from 'next/font/google';

import { ScrollManager } from '../components/scrollManager';
import {LanguageProvider} from "../components/languageHelpers";

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <ScrollManager>
          <LanguageProvider>
            <Component {...pageProps} />
          </LanguageProvider>
        </ScrollManager>
      </>
    );
  }
}

export default MyApp;

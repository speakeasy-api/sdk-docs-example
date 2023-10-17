import React from 'react';
import App from 'next/app';
import { LanguageProvider } from '@/content/languages';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    );
  }
}

export default MyApp;
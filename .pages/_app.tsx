import React from 'react'
import App from 'next/app'
import {ScrollManager} from "../components/scrollHelpers";
import {LanguageProvider} from "../components/languageHelpers";

class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props
        return <ScrollManager>
            <LanguageProvider>
                <Component {...pageProps} />
            </LanguageProvider>
        </ScrollManager>
    }
}

export default MyApp
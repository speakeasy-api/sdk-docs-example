import React from 'react'
import App from 'next/app'
import {ScrollManager} from "../components/scrollHelpers";

class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props
        return <ScrollManager>
            <Component {...pageProps} />
        </ScrollManager>
    }
}

export default MyApp
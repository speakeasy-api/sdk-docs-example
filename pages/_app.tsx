import React from 'react'
import {ScrollManager} from "../components/scrollManager";
import App from "../.gen/_app";
import "../styles/styles.css"

class MyApp extends App {
    render() {
        return <ScrollManager>
            {super.render()}
        </ScrollManager>
    }
}

export default MyApp
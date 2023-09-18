import {ReactNode} from "react";
import {H3} from "./header";

export const LanguageOperation = (props: {
    usage: ReactNode,
    parameters: ReactNode,
    response: ReactNode
}) => {
    return <>
        <div style={{display: "flex", width: "1200px"}}>
            <div style={{flex: 1}}>
                <H3>Parameters</H3>
                {props.parameters}
                <H3>Response</H3>
                {props.response}
            </div>
            <div style={{flex: 1}}>
                {props.usage}
            </div>
        </div>
    </>
}
import {ReactNode} from "react";

export const LanguageOperation = (props: {
    usage: ReactNode,
    parameters: ReactNode,
    response: ReactNode
}) => {
    return <div>
        <div style={{display: "flex"}}>
            <div style={{flex: "50%", maxWidth: "700px"}}>
                {props.usage}
            </div>
            <div style={{flex: "50%"}}>
                <h3>Parameters</h3>
                {props.parameters}
            </div>
        </div>
        <h3>Response</h3>
        {props.response}
    </div>
}
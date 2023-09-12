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
                {props.parameters}
            </div>
        </div>
        {props.response}
    </div>
}
import {ReactNode} from "react";
import {LanguageSwitch} from "./languageHelpers";
import {Language} from "../structure/language";
import {RouteContext} from "./scrollHelpers";

export const DocsSection = (props: {
    route?: string,
    languageToContent: Record<Language, ReactNode>
}) => {
    return <RouteContext.Provider value={props.route ?? "/"}>
        <LanguageSwitch langToContent={props.languageToContent}/>
    </RouteContext.Provider>
}

export const LanguageOperation = (props: {
    overview: ReactNode,
    usage: ReactNode,
    parameters: ReactNode,
    response: ReactNode
}) => {
    return <div>
        {props.overview}
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
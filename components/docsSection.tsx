import {ReactNode, useContext} from "react";
import {RouteContext} from "./scrollHelpers";

export const DocsSection = ({route, children}: {
    route?: string,
    children?: ReactNode
}) => {
    let parentRoute = useContext(RouteContext);
    if (parentRoute === "/") parentRoute = ""

    if (route.startsWith("/")) route = route.slice(1);

    return <RouteContext.Provider value={`${parentRoute}/${route ?? ""}`}>
        <div style={{margin: "48px 0px", borderTop: "1px solid black", borderBottom: "1px solid black"}}>
            {children}
        </div>
    </RouteContext.Provider>
}

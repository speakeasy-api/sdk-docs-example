import React, {ReactElement, useContext} from "react";
import {RouteContext} from "./scrollManager";
import {RHS} from "./columns";
import {splitChildrenByType} from "./helpers";

export const DocsSection = ({route, children}: {
    route?: string,
    children?: ReactElement
}) => {
    let parentRoute = useContext(RouteContext);
    if (parentRoute === "/") parentRoute = ""
    if (route.startsWith("/")) route = route.slice(1);

    // Root page content needs a route to live in, so wrap it in /home
    const homeOverride = parentRoute === "" ? "/home" : ""
    // Then cut it out when pulling from children. But only when the route is only /{root}/home
    if (parentRoute.endsWith("/home") && parentRoute.split("/").length === 3) {
        parentRoute = parentRoute.slice(0, parentRoute.lastIndexOf("/home"))
    }

    const [rhs, lhs] = splitChildrenByType(children, RHS);
    const mainContent = lhs.length || rhs.length ? lhs : children

    if (route.includes("installation")) {
        console.log(lhs, rhs)
    }

    const columns = <div style={{display: "flex", width: "1200px"}}>
        <div style={{flex: 1}}>
            {mainContent}
        </div>
        <div style={{flex: 1}}>
            {rhs}
        </div>
    </div>

    return <RouteContext.Provider value={`${parentRoute}/${route ?? ""}${homeOverride}`}>
        <div style={{
            margin: "48px 0px",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            width: "600px",
            overflow: "visible"
        }}>
            {rhs.length > 0 ? columns : mainContent}
        </div>
    </RouteContext.Provider>
}

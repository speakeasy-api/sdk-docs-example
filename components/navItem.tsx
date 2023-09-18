import {ScrollContext} from "./scrollManager";
import React, {useContext} from "react";
import {toRouteFormat} from "./header";

export const NavItem = ({title}) => {
    const {currentHeading} = useContext(ScrollContext);

    const pageTitle = title.split("/").pop()
    const titleSlug = "/" + toRouteFormat(title.toLowerCase())

    const baseHeading = currentHeading.split("#")[0]

    const selected = baseHeading === titleSlug
    return <div style={{background: selected ? "cyan" : "none"}}>{pageTitle}</div>
}
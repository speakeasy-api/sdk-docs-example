import {ScrollContext} from "./scrollManager";
import React, {useContext} from "react";

export const NavItem = ({title}) => {
    const {currentHeading} = useContext(ScrollContext);

    const pageTitle = title.split("/").pop()
    const titleSlug = "/" + title.toLowerCase().replace(" ", "_")

    const selected = currentHeading === titleSlug
    return <div style={{background: selected ? "cyan" : "none"}}>{pageTitle}</div>
}
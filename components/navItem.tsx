import {ScrollContext} from "./scrollHelpers";
import React, {useContext} from "react";

export const NavItem = ({title}) => {
    const {currentHeading} = useContext(ScrollContext);

    const pageTitle = title.split("/").pop()
    const titleSlug = "/" + title.toLowerCase().replace(" ", "_")

    const isHome = ["/", undefined, ""].includes(currentHeading) && title === "Home"
    const selected = currentHeading === titleSlug || isHome
    return <div style={{background: selected ? "cyan" : "none"}}>{pageTitle}</div>
}
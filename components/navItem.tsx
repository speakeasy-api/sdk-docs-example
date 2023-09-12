import {useRouter} from "next/router";
import {slugString} from "./scrollHelpers";
import React from "react";

export const NavItem = ({title, route}) => {
    const router = useRouter()
    const pageTitle = title.split("/").pop()

    const slug = slugString(router) ?? "";
    const titleSlug = title.toLowerCase().replace(" ", "_")

    const selected = slug === titleSlug || slug === route
    return <div style={{background: selected ? "cyan" : "none"}}>{pageTitle}</div>
}
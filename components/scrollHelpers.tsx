import React, {useContext, useEffect, useRef} from "react";
import {NextRouter, useRouter} from "next/router";
import {Language} from "../structure/language";

export const RouteContext = React.createContext("");

export const ScrollManager = (): React.ReactElement => {
    const router = useRouter()
    const slug = slugString(router);

    React.useEffect(() => {
        const element = document.getElementById(slug)
        if (element) {
            element.scrollIntoView({behavior: "smooth"})
        }
    }, [slug])

    return null
}

export const slugString = (router: NextRouter): string => {
    const slug = router.query.slug;
    return asString(slug);
}

export const asString = (s: string | string[]): string => {
    if (s instanceof Array) {
        return s.join("/").replaceAll(" ", "-")
    }
    return s;
}

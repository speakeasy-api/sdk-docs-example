import React, {ReactNode, useEffect, useMemo} from "react";
import {NextRouter, useRouter} from "next/router";

export const RouteContext = React.createContext("");
export const ScrollContext = React.createContext<{
    headingToPosition: Record<string, number>,
    upsertHeading: (heading: string, position: number) => void
}>({
    headingToPosition: {}, upsertHeading: () => {
    }
});

export const ScrollManager = (props: { children: ReactNode }): React.ReactElement => {
    const router = useRouter()
    const slug = slugString(router);

    const [headingToPosition, setHeadingToPosition] = React.useState<Record<string, number>>({})
    const upsertHeading = (heading: string, position: number) => {
        const offset = 100; // Change the route slightly preemptively
        setHeadingToPosition((current) => ({...current, [heading]: position + offset}))
        console.log("upserting", heading, position)
    }

    const [scrolling, setScrolling] = React.useState(false);

    /**
     * This is responsible for setting the route in the URL to the closest heading when the user scrolls.
     * This is memoized so that it can be removed when the route changes (otherwise it prevents scrolling to the desired heading)
     */
    const scroll = useMemo(() => () => {
        const proximity = (pagePos: number) => Math.abs(window.scrollY - pagePos)
        const closest = Object.entries(headingToPosition)
            .sort((a, b) => proximity(a[1]) - proximity(b[1]))
            .at(0)[0]

        console.log("Setting route to", closest)
        router.replace(closest, undefined, {shallow: true})
        // window.history.replaceState({...window.history.state, as: closest, url: closest}, '', closest)
    }, [headingToPosition, scrolling]);

    useEffect(() => {
        if (!scrolling) {
            window.addEventListener("scroll", scroll, false);
        }
        return () => window.removeEventListener("scroll", scroll, false);
    }, [scroll, scrolling]);

    /**
     * This is responsible for scrolling to the relevant heading when the route in the URL changes
     */
    React.useEffect(() => {
        const element = document.getElementById("/" + (slug ?? ""));
        if (element) {
            if ("onscrollend" in window) {
                window.removeEventListener("scroll", scroll, false);
                setScrolling(true);

                console.log("scrolling to", element.id)
                element.scrollIntoView({behavior: "smooth"})

                document.addEventListener("scrollend", () => {
                    setScrolling(false);
                }, {once: true});
            } else {
                element.scrollIntoView()
            }
        }
    }, [slug])


    return <ScrollContext.Provider value={{headingToPosition, upsertHeading}}>{props.children}</ScrollContext.Provider>
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

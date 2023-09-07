import React, {useEffect, useRef} from "react";
import {NextRouter, useRouter} from "next/router";

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

    if (slug instanceof Array) {
        return slug.join("/").replaceAll(" ", "-")
    }
    return slug;
}

export const Header = ({children}) => {
    const router = useRouter();
    children = children.toString().replaceAll(",", "")
    const id = children.toLowerCase().replaceAll(" ", "-")
    const title = children.split("/").pop()
    const [top, setTop] = React.useState<number>()

    const inputRef = useRef<HTMLHeadingElement>()

    useEffect(() => {
        const scroll = (event) => {
            if (window.scrollY + 150 < top && top < window.scrollY + 200) {
                router.replace(id, undefined, {shallow: true})
            }
        }
        window.addEventListener("scroll", scroll, false);
        return () => window.removeEventListener("scroll", scroll, false);
    }, [top]);

    useEffect(() => {
        setTop(inputRef.current.offsetTop)
    }, [inputRef.current]);

    return (
        <h2
            ref={inputRef}
            id={id}>{title + top}</h2>
    );
}
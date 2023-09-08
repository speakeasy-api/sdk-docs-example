import {useRouter} from "next/router";
import React, {useContext, useEffect, useRef} from "react";
import {asString, RouteContext} from "./scrollHelpers";

export const Header = ({children}) => {
    const router = useRouter();
    const routeContext = useContext(RouteContext);
    const [top, setTop] = React.useState<number>()

    const id = routeContext + "/" + asString(children).toLowerCase()

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
            id={id}
            style={{fontSize: "32px"}}>{children}</h2>
    );
}

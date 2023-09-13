import React, {ReactNode, useContext, useEffect, useRef} from "react";
import {RouteContext, ScrollContext} from "./scrollHelpers";

export const Header = (headingType: string) => (props: { children: ReactNode }) => {
    const route = useContext(RouteContext);
    const scrollContent = useContext(ScrollContext);

    const inputRef = useRef<HTMLHeadingElement>()

    console.log(route)

    useEffect(() => {
        scrollContent.upsertHeading(route, inputRef.current.offsetTop)
    }, [inputRef.current]);

    return (
        React.createElement(headingType, {
            ref: inputRef,
            id: route,
            style: {fontSize: "32px"}
        }, props.children)
    );
}

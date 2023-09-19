import React, {ReactNode, useContext, useEffect, useRef} from "react";
import {RouteContext, ScrollContext} from "./scrollManager";

export const Header = (headingType: string) => (props: { children: ReactNode }) => {
    const route = useContext(RouteContext);
    const scrollContent = useContext(ScrollContext);

    const headingValue = toRouteFormat(props.children.toString());

    const inputRef = useRef<HTMLHeadingElement>()

    useEffect(() => {
        scrollContent.upsertHeading(route, headingValue, inputRef.current, inputRef.current.offsetTop)
    }, [inputRef.current?.offsetTop]);

    return (
        React.createElement(headingType, {
            ref: inputRef,
            id: route,
            style: {fontSize: "32px"}
        }, props.children)
    );
}

export const H3 = Header("h3")

export const toRouteFormat = (s: string) => s.toLowerCase().replaceAll(" ", "_")

import {ReactElement, ReactNode} from "react";
import {partition} from "lodash";

export const splitChildrenByType = (parent: ReactElement, type: (props: any) => JSX.Element): [ReactNode[], ReactNode[]] => {
    let children = parent.props.children

    if (!children && typeof parent.type === "function") {
        children = (parent as any).type().props.children
    }

    return partition(children, (e) => e.type === type)
}

export const typeMatches = (e: ReactNode, type: (props: any) => JSX.Element): boolean => {
    return typeof e === "symbol" && "type" in (e as any) && (e as any).type === type
}

export const splitAround = <T, >(a: T[], fn: (e: T) => boolean): [T[], T[]] => {
    const breakIndex = a.findIndex(fn)

    if (breakIndex === -1) {
        return [a, []]
    }

    return [a.slice(0, breakIndex), a.slice(breakIndex + 1)];
}


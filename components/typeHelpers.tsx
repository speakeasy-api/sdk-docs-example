import { ReactElement, ReactNode } from 'react';
import { partition } from 'lodash';

// Needs to support both arrays of children and MDXContent nodes (whose children first need to be extracted)
export const splitByType = (node: ReactNode, type: (props: any) => JSX.Element): [ReactNode[], ReactNode[]] => {
    if (Array.isArray(node)) {
        return splitElementsByType(node, type);
    } else {
        return splitMDXContentChildrenByType(node, type)
    }
};

// Assumes the parent is an MDXContent node
export const splitMDXContentChildrenByType = (parent: ReactNode, type: (props: any) => JSX.Element): [ReactNode[], ReactNode[]] => {
    let children = (parent as any).props?.children;

    if (!children) {
        if ('type' in (parent as any) && typeof (parent as any).type === 'function') {
            children = (parent as any).type().props.children;
        } else {
            return [[], []];
        }
    }

    return splitElementsByType(children, type);
};

export const splitElementsByType = (elements: ReactElement[], type: (props: any) => JSX.Element): [ReactElement[], ReactElement[]] => {
    return partition(elements, (e) => e.type === type);
};

export const typeMatches = (e: ReactNode, type: (props: any) => JSX.Element): boolean => {
    return typeof e === 'symbol' && 'type' in (e as any) && (e as any).type === type;
};

export const splitAround = <T, >(a: T[], fn: (e: T) => boolean): [T[], T[]] => {
    const breakIndex = a.findIndex(fn);

    if (breakIndex === -1) {
        return [a, []];
    }

    return [a.slice(0, breakIndex), a.slice(breakIndex + 1)];
};


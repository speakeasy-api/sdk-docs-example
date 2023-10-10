import React from 'react';
import { partition } from 'lodash';

// Needs to support both arrays of children and MDXContent nodes (whose children first need to be extracted)
export const splitByType = (
  node: React.ReactNode,
  type: (props: { children: React.ReactNode }) => React.JSX.Element,
): [React.ReactNode[], React.ReactNode[]] => {
  if (Array.isArray(node)) {
    return splitElementsByType(node, type);
  } else {
    return splitMDXContentChildrenByType(node, type);
  }
};

// Assumes the parent is an MDXContent node
export const splitMDXContentChildrenByType = (
  parent: React.ReactNode,
  type: (props: { children: React.ReactNode }) => React.JSX.Element,
): [React.ReactNode[], React.ReactNode[]] => {
  let children = (parent as any).props?.children;

  if (!children) {
    if (
      'type' in (parent as any) &&
      typeof (parent as any).type === 'function'
    ) {
      children = (parent as any).type().props.children;
    } else {
      return [[], []];
    }
  }

  return splitElementsByType(children, type);
};

export const splitElementsByType = (
  elements: React.ReactElement[],
  type: (props: { children: React.ReactNode }) => React.JSX.Element,
): [React.ReactElement[], React.ReactElement[]] => partition(elements, (e: any) => e.type === type);

export const typeMatches = (
  e: React.ReactNode,
  type: () => React.JSX.Element,
): boolean => 'type' in (e as any) && (e as any).type === type;

export const splitAround = <T, >(a: T[], fn: (e: T) => boolean): [T[], T[]] => {
  const breakIndex = a.findIndex(fn);

  if (breakIndex === -1) {
    return [a, []];
  }

  return [a.slice(0, breakIndex), a.slice(breakIndex + 1)];
};

import React, {ReactNode} from "react";

type propsType = {
    children: ReactNode[]
}

const Collapsible: React.FC<propsType> = (props: propsType) => {
    const elements = React.Children.toArray(props.children).filter((child) => child !== "\n");

    // This is necessary because the following:
    //    > collapse
    //    > my summary
    // gets turned into:
    //    collapse\nmy summary
    // So we need to split any newlines into separate elements
    const lines = elements.flatMap(splitElementIntoLines);

    const first = lines.shift();
    const firstElementString = childString(first);
    const isCollapsible = firstElementString?.startsWith("collapse");

    if (!isCollapsible) {
        return <blockquote>{props.children}</blockquote>
    }

    // By default, use the last element as the body and the rest as the summary
    let summarySection = [...lines];
    let bodySection = summarySection.pop();


    // If one of the lines is "collapse body", then split on that line with everything above becoming the summary
    // and everything below becoming the body
    const {i} = lines
        .map((child, i) => ({s: childString(child), i}))
        .find(({s, i}) => s === "collapse body") ?? {i: undefined};

    if (i !== undefined) {
        summarySection = lines.slice(0, i);
        bodySection = lines.slice(i + 1);
    }

    const config = firstElementString.split(" ");
    const defaultOpen = config.includes("open");

    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return <div style={{border: "1px solid green"}}>
        <div onClick={() => setIsOpen((prev) => !prev)}>{summarySection}{isOpen ? "-" : "+"}</div>
        {isOpen && <div style={{padding: "8px"}}>{bodySection}</div>}
    </div>
}

const splitElementIntoLines = (element: ReactNode): ReactNode[] => {
    return childString(element)
            ?.split("\n")
            .map((c, i) => <p key={i}>{c}</p>)
        ?? [element];
}

// Returns the string value of the child if it is a string
const childString = (child: ReactNode): string | undefined => {
    const children = (child as any).props?.children
    return typeof children === "string" ? children : undefined;
}

export default Collapsible

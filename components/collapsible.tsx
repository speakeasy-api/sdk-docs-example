import React, {ReactNode} from "react";

type propsType = {
    children: ReactNode
}

const Collapsible: React.FC<propsType> & { Summary: typeof Summary } = (props: propsType) => {
    const [summary, ...children] = React.Children.toArray(props.children);
    const [isOpen, setIsOpen] = React.useState(false);

    return <div style={{border: "1px solid green"}}>
        <div onClick={() => setIsOpen((prev) => !prev)}>{summary}{isOpen ? "-" : "+"}</div>
        {isOpen && <div style={{padding: "8px"}}>{children}</div>}
    </div>
}

const Summary = (props: {
    children?: ReactNode
}) => {
    return <div>{props.children}</div>
}

Collapsible.Summary = Summary

export default Collapsible

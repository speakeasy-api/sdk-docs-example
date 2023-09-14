import React, {ReactNode} from "react";

type propsType = {
    children: ReactNode[]
    defaultOpen?: boolean
}

const Collapsible: React.FC<propsType> & { Break: typeof Break } = (props: propsType) => {
    const elements = props.children

    const isBreak = (e: any) => {
        const isFn = e.type && typeof e.type === "function"
        return isFn && e.type().props?.children === "collapsible-break"
    }

    const breakIndex = elements.findIndex((e) => isBreak(e))

    if (breakIndex === -1) {
        return <div>{elements}</div>
    }

    const summarySection = elements.slice(0, breakIndex);
    const bodySection = elements.slice(breakIndex + 1);

    const [isOpen, setIsOpen] = React.useState(!!props.defaultOpen);

    return <div style={{border: "1px solid green"}}>
        <div onClick={() => setIsOpen((prev) => !prev)}>{summarySection}{isOpen ? "-" : "+"}</div>
        {isOpen && <div style={{padding: "8px"}}>{bodySection}</div>}
    </div>
}

const Break = () => {
    return <div>collapsible-break</div>
}

Collapsible.Break = Break

export default Collapsible

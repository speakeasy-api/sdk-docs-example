import React, {ReactNode} from "react";
import {splitAround, typeMatches} from "./typeHelpers";

type propsType = {
    children: ReactNode[]
    defaultOpen?: boolean
}

const Collapsible: React.FC<propsType> & { Break: typeof Break } = (props: propsType) => {
    const elements = props.children
    const [isOpen, setIsOpen] = React.useState(!!props.defaultOpen);

    const [summarySection, bodySection] = splitAround(elements, (e) => typeMatches(e, Break));

    return <div style={{border: "1px solid green"}}>
        <div onClick={() => setIsOpen((prev) => !prev)}>{summarySection}{isOpen ? "-" : "+"}</div>
        {isOpen && <div style={{padding: "8px"}}>{bodySection}</div>}
    </div>
}

const Break = () => {
    return <></>
}

Collapsible.Break = Break

export default Collapsible

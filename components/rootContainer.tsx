import {ReactNode} from "react";

export const RootContainer = (props: { children: ReactNode }) => {
    return <div style={{width: "1200px", margin: "0 auto"}}>
        {props.children}
    </div>
}
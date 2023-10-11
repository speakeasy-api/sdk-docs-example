import React, { ReactNode, useState, useEffect } from 'react';
import { splitAround, typeMatches } from './typeHelpers';

type propsType = {
    children: ReactNode[];
    defaultOpen?: boolean;
    content?: () => Promise<any>;
}

const Collapsible: React.FC<propsType> & { Break: typeof Break } = (props: propsType) => {
    const { content, children } = props;
    const [isOpen, setIsOpen] = useState(!!props.defaultOpen);
    const [ContentComponent, setContentComponent] = useState<any>(null);

    useEffect(() => {
        if (isOpen && content && !ContentComponent) {
            content()
                .then((module) => {
                    setContentComponent(() => module.default);
                })
                .catch((error) => {
                    console.error("Failed to load the content component", error);
                });
        }
    }, [isOpen, content, ContentComponent]);

    const dynamicChildren = isOpen && ContentComponent
        ? [<ContentComponent key="dynamicContentComponent" />]
        : [];

    const allChildren = children
        ? [...children, ...dynamicChildren]
        : [...dynamicChildren];

    const [summarySection, bodySection] = allChildren && allChildren.length
        ? splitAround(allChildren, (e) => typeMatches(e, Break))
        : [[], []];

    return (
        <div style={{ border: '1px solid green' }}>
            <div onClick={() => setIsOpen((prev) => !prev)}>
                {summarySection}
                {isOpen ? '-' : '+'}
            </div>
            {isOpen && <div style={{ padding: '8px' }}>{bodySection}</div>}
        </div>
    );
};

const Break = () => <></>;

Collapsible.Break = Break;

export default Collapsible;

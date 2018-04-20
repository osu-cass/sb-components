import * as React from "react";
export interface AccordionProps {
    accordionTitle: string;
    isOpen: boolean;
    toggleExpand: () => void;
}
export declare class Accordion extends React.Component<AccordionProps, {}> {
    constructor(props: AccordionProps);
    renderContent(isOpen: boolean): JSX.Element | undefined;
    renderCarat(isOpen: boolean): JSX.Element | undefined;
    render(): JSX.Element;
}

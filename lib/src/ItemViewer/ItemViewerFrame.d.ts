import * as React from "react";
export interface FrameProps {
    url?: string;
    title?: string;
}
export interface FrameState {
    loading: boolean;
}
export declare class ItemViewerFrame extends React.Component<FrameProps, FrameState> {
    constructor(props: FrameProps);
    startLoad: () => void;
    finishLoad: () => void;
    renderNoItem(): JSX.Element;
    componentWillReceiveProps(nextProps: FrameProps): void;
    renderProgressBar(): JSX.Element | undefined;
    renderItem(): JSX.Element;
    render(): JSX.Element;
}

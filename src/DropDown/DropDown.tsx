import * as React from 'react';

export interface Selection {
    disabled: boolean;
    label: string;
    selectionCode: string;
    order: number;
    hidden: boolean;
}

export interface Props {
    label: string;
    disabled: boolean;
    selectionCode: string;
    selections: Selection[];
    updateSelection(selectionCode: string, resourceCode: string): void;
    defaultSelection: string;
    resourceCode: string;
}

export class Dropdown extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    onChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.props.updateSelection(event.currentTarget.value, this.props.resourceCode);
    }

    renderOption = (selection: Selection) => {
        const disabledCSS: string = selection.disabled ? "option-disabled" : "option-enabled";
        const label = this.props.disabled ? "" : selection.label;
        return (
            <option value={selection.selectionCode}
                aria-label={selection.label}
                disabled={selection.disabled}
                aria-hiden={selection.disabled}
                key={selection.selectionCode}
                className={disabledCSS}
                selected={this.props.selectionCode === selection.selectionCode}>
                {label}
            </option>
        );
    }

    render() {
        const classes = "accessibility-dropdown form-group ".concat(this.props.disabled ? "selection-disabled" : "selection-enabled");
        const options = this.props.selections.map(this.renderOption);
        return (
            <div className={classes}>
                <label htmlFor={this.props.resourceCode}> {this.props.label}</label><br />
                <select className="form-control"
                    id={this.props.resourceCode}
                    disabled={this.props.disabled}
                    aria-hidden={this.props.disabled}
                    onChange={this.onChange}
                    value={this.props.selectionCode}>
                    {options}
                </select>
            </div>
        );
    }
}

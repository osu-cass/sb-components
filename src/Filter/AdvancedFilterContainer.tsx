import * as React from "react";
import { AdvancedFilterOption, OptionType, AdvancedFilterCategory, AdvancedFilters } from './AdvancedFilterModel';
import { AdvancedFilter } from './AdvancedFilter';
import "../styles/AdvancedFilter.css";
import 'font-awesome/css/font-awesome.css';


export interface Props {
    filterOptions: AdvancedFilterCategory[];
    onClick: (selected: AdvancedFilterCategory[]) => void;
}  

export interface State {
    filters: AdvancedFilterCategory[];
    expanded: boolean
}

export class AdvancedFilterContainer extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            filters: props.filterOptions,
            expanded: false
        }
    }

    handleClick = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    onSelect(category: AdvancedFilterCategory, option?: AdvancedFilterOption) {
        const index = this.state.filters.indexOf(category);
        const newFilters = [...this.state.filters];
        let newOptions: AdvancedFilterOption[] = [];

        //TODO Refactor
        if (!option) { // all pressed
            newOptions = newFilters[index].filterOptions
                .map(opt => { return { ...opt, isSelected: false } });
        } else {
            const optionIdx = newFilters[index].filterOptions.indexOf(option);
            if (category.isMultiSelect) {
                newOptions = newFilters[index].filterOptions
                    .map(opt => { return { ...opt } });
            }
            else {
                newOptions = newFilters[index].filterOptions
                    .map(opt => { return { ...opt, isSelected: false } });
            }

            newOptions[optionIdx].isSelected = !option.isSelected;
        }

        newFilters[index] = {
            ...newFilters[index],
            filterOptions: newOptions
        };

        this.setState({
            filters: newFilters
        });

        this.props.onClick(newFilters);
    }

    resetFilters() {
        let newFilters = this.state.filters;
        newFilters.forEach(cate => {
            cate.filterOptions.map(opt => opt.isSelected = false);
        });

        this.setState({
            filters: [...newFilters]
        });
        this.props.onClick(newFilters);
    }

    keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 0 || e.keyCode === 13 || e.keyCode === 32) {
            this.resetFilters();
        }
    }

    renderFilterIndicators() {
        let tags: JSX.Element[] = []

        this.state.filters.forEach(fil => {
            if (!fil.disabled) {
                fil.filterOptions.forEach(opt => {
                    if (opt.isSelected) {
                        tags.push(
                            <div className="filter-indicator" key={opt.key}>
                                {opt.label}&nbsp;<span onClick={() => this.onSelect(fil, opt)} className="fa fa-times fa-small" />
                            </div>
                        );
                    }
                });
            }
        });

        return tags;
    }

    renderFilterHeader() {
        return (
            <div className="filter-header">
                <div style={{ display: "flex", flexflow: "row nowrap", justifyContent: "space-between" }}>
                    <a onClick={() => this.resetFilters()}
                        onKeyPress={e => this.keyPressResetFilters(e)}
                        tabIndex={0}>Reset filters</a>
                </div>
                <div className="filter-status">
                    {this.renderFilterIndicators()}
                </div>
            </div>
        );
    }

    renderFilterBody() {
        const filterTags = this.state.filters.map((fil, i) => {
            return (
                <AdvancedFilter {...fil} selectedHandler={(opt) => this.onSelect(fil, opt)} />
            );
        });

        return (
            <div className="filter-body" aria-live="polite" aria-relevant="additions removals">
                {filterTags}
            </div>
        );
    }

    renderCollapsedFilterContainer = () => {
        const className = this.state.expanded ? "fa fa-chevron-up" : "fa fa-chevron-down";
        const buttonText = this.state.expanded ? "Collapse " : "Expand ";
        return (
            <div style={{ display: "flex", flexFlow: "row nowrap", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div style={{ display: "flex", flexFlow: "row nowrap", color: "gray", alignItems: "center" }}>
                    <h2 style={{ color: "#63666A" }}><span className="fa fa-tasks fa-lg" />&nbsp;Advanced Filters</h2>
                    <span>&nbsp;Click on an item to remove it.</span>
                </div>
                <button onClick={this.handleClick} className="filter-button">{buttonText}<span className={className} /></button>
            </div>
        )
    }

    

    render() {
        let content = null;
        if (this.state.expanded) {
            content = (<div className="advanced-filter-container-expanded">{this.renderFilterHeader()}{this.renderFilterBody()}</div>)
        }

        return (
            <div className="advanced-filter-container">
                {this.renderCollapsedFilterContainer()}
                {content}
            </div>
        );
    }
}
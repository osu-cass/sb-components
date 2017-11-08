import '../Styles/advanced-filter.less'
import * as React from "react";
import { FilterOption, OptionType, AdvancedFilterCategory, AdvancedFilters } from './AdvancedFilterModel';
import { AdvancedFilter } from './AdvancedFilter';

export interface AdvancedProps {
    filterOptions: AdvancedFilterCategory[];
    onClick: (selected: AdvancedFilterCategory[]) => void;
}

export interface AdvancedState {
    filters: AdvancedFilterCategory[];
    expanded: boolean
}

export class AdvancedFilterContainer extends React.Component<AdvancedProps, AdvancedState>{
    constructor(props: AdvancedProps) {
        super(props);

        this.state = {
            filters: props.filterOptions,
            expanded: false
        }
    }

    handleClick = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    onSelect(category: AdvancedFilterCategory, option?: FilterOption) {
        const index = this.state.filters.indexOf(category);
        const newFilters = [...this.state.filters];
        let newOptions: FilterOption[] = [];

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

    hasActiveFilterIndicators(){
        let active = false;
        this.state.filters.forEach(fil => {
            if(!fil.disabled){
                fil.filterOptions.forEach(opt => {
                    if(opt.isSelected){
                        active = true;
                    }
                })
            }
        })
        return active;
    }

    renderFilterIndicators() {
        let tags: JSX.Element[] = []

        this.state.filters.forEach(fil => {
            if (!fil.disabled) {
                fil.filterOptions.forEach(opt => {
                    if (opt.isSelected) {
                        tags.push(
                            <div className="filter-indicator" key={opt.key}>
                                {opt.label}&nbsp;<span onClick={() => this.onSelect(fil, opt)} className="fa fa-times-circle fa-small" />
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
                <div className="filter-status">
                    {this.renderFilterIndicators()}
                </div>
            </div>
        );
    }

    renderFilterBody() {
        const filterTags = this.state.filters.map((fil, i) => {
            return (
                <AdvancedFilter key={i} {...fil} selectedHandler={(opt) => this.onSelect(fil, opt)} />
            );
        });

        return (
            <div className="filter-body" aria-live="polite" aria-relevant="additions removals">
                {filterTags}
            </div>
        );
    }

    renderCollapsedFilterContainer = () => {
        const { filters } = this.state;
        const className = this.state.expanded ? "fa fa-chevron-down" : "fa fa-chevron-right";
        const buttonText = this.state.expanded ? "Collapse " : "Expand ";
        return (
            <div className="filter-sub-header-container">
                <div className="filter-advanced-filter-header">
                    <div className="filter-advanced-filter-title">
                        <h2 style={{ color: "#63666A" }}><span className="fa fa-tasks fa-lg" />&nbsp;Advanced Filters</h2>
                        <span style={{marginTop: "6px"}}>&nbsp;Click on an item to remove it from the list</span>
                    </div>
                    <div style={{ display: "flex", marginRight: "10px"}}>
                        {
                            this.hasActiveFilterIndicators() ?
                                <button onClick={() => this.resetFilters()} className="filter-button">Reset Filters</button> :
                                null}
                        <button onClick={() => this.handleClick()} className="filter-button">{buttonText}<span className={className} /></button>
                    </div>
                </div>
                {
                    filters && filters.length > 0 ?
                        this.renderFilterHeader() :
                        null
                }
            </div>
        )
    }


    render() {
        let content = null;
        if (this.state.expanded) {
            content = (<div className="advanced-filter-container-expanded">{this.renderFilterBody()}</div>)
        }

        return (
            <div className="advanced-filter-container">
                {this.renderCollapsedFilterContainer()}
                {content}
            </div>
        );
    }
}
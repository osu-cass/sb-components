import "../Assets/Styles/filter-link.less";
import * as React from "react";

export interface FilterLinkProps {
  filterId: string;
}
export class FilterLink extends React.Component<FilterLinkProps, {}> {
  render() {
    return (
      <div className="filter-jump-link-container">
        <a className="filter-jump-link" href={this.props.filterId}>
          Jump to Filter
        </a>
      </div>
    );
  }
}

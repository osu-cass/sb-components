import * as React from "react";

export interface FilterLinkProps {
  filterId: string;
}
export class FilterLink extends React.Component<FilterLinkProps, {}> {
  render() {
    return (
      <a className="filter-jump-link" href={this.props.filterId}>
        Jump to Filter
      </a>
    );
  }
}

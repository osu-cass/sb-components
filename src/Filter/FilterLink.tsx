import "../Assets/Styles/filter-link.less";
import * as React from "react";

/**
 * The filterId is an element id that refers to the id of the Filter
 * element on the DOM
 * @interface FilterLinkProps
 * @member {string} filterId
 */
export interface FilterLinkProps {
  filterId: string;
}

/**
 * A link button that is fixed to the bottom of the screen that navigates to the
 * filter on the DOM.
 * @class FilterLink
 * @extends {React.Component<FilterLinkProps, {}>}
 */
export class FilterLink extends React.Component<FilterLinkProps, {}> {
  render() {
    return (
      <div className="filter-jump-link-footer">
        <div className="filter-jump-link-container">
          <a className="filter-jump-link" href={this.props.filterId}>
            Jump to Filter
          </a>
        </div>
      </div>
    );
  }
}
